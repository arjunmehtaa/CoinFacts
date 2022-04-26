import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "@firebase/database";
import { getAuth } from "firebase/auth";
import { Coin } from "../model";
import { getCoin } from "../services";
import { isValidCoin, sortCoinList } from "../utils";
import theme from "../theme";
import { CoinFlatList, LoadingIndicator } from "../components";

const { colors, fontSizes, margins } = theme;

const Watchlist = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoin = async (id: string) => {
    if (id) {
      const coin = await getCoin(id);
      if (isValidCoin(coin[0])) {
        setData((data) => [...data, coin[0]]);
        setData((data) => sortCoinList(data));
      }
    }
  };

  const fetchWatchlist = (watchlistArray: string[]) => {
    setData([]);
    watchlistArray.forEach((coinId) => {
      fetchCoin(coinId);
    });
    setLoading(false);
  };

  useEffect(() => {
    const db = getDatabase();
    const reference = ref(db, "users/" + getAuth().currentUser?.uid);
    return onValue(reference, (snapshot) => {
      if (snapshot.val()?.watchlist) {
        const watchlist = snapshot.val()?.watchlist;
        fetchWatchlist(
          watchlist.substring(1, watchlist.length - 1).split(";;")
        );
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.title, {}]}>Watchlist</Text>
          {/* <TrendingIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
          /> */}
        </View>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <CoinFlatList data={data} fromSearch={false} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSizes.xlarge,
    marginHorizontal: margins.large,
    marginTop: margins.xlarge,
    marginBottom: margins.small,
    color: colors.darkGrey,
  },
});

export default Watchlist;
