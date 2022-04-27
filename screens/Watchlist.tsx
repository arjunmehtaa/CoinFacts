import { View, StyleSheet, SafeAreaView, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "@firebase/database";
import { getAuth } from "firebase/auth";
import { Coin } from "../model";
import { getCoins } from "../services";
import { isValidCoin, sortCoinList } from "../utils";
import theme from "../theme";
import { CoinFlatList, Heading, LoadingIndicator } from "../components";

const { colors, margins, fontSizes } = theme;

const Watchlist = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = async (idsArray: string[]) => {
    const coins = await getCoins(idsArray);
    setData(coins);
    setLoading(false);
  };

  const fetchWatchlist = (watchlistArray: string[]) => {
    const idsArray: string[] = [];
    watchlistArray.forEach((coinId) => {
      idsArray.push(coinId);
    });
    fetchCoins(idsArray);
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
        setData([]);
        setLoading(false);
      }
    });
  }, []);

  const renderEmptyWatchlist = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/illustrations/no-watchlist.png")}
        />
        <Text style={styles.subtitle}>
          Looks like your watchlist is empty.{"\n"} Add a coin to your watchlist
          to get started.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Heading title="Watchlist" style={{ marginBottom: margins.small }} />
        </View>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {data.length > 0 ? (
              <CoinFlatList data={data} />
            ) : (
              renderEmptyWatchlist()
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  imageStyle: {
    height: undefined,
    width: "70%",
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: fontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: colors.lightGrey,
  },
});

export default Watchlist;
