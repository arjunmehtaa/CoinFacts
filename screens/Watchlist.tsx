import { View, StyleSheet, SafeAreaView, Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "@firebase/database";
import { getAuth } from "firebase/auth";
import { Coin } from "../model";
import { getCoins } from "../services";
import theme from "../theme";
import { Button, CoinFlatList, Heading, LoadingIndicator } from "../components";
import { AuthContext } from "../contexts/UserContext";

const { colors, margins, fontSizes } = theme;

const Watchlist = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { returnToLogin } = React.useContext(AuthContext);
  const db = getDatabase();
  const user = getAuth().currentUser;

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
    if (user) {
      setIsLoggedIn(true);
      const userId = user?.uid;
      const reference = ref(db, "users/" + userId);
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
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const renderEmptyWatchlist = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/illustrations/no-watchlist.png")}
        />
        <Text style={styles.subtitle}>
          Looks like your watchlist is empty.{"\n"} Add a coin to your list to
          track it.
        </Text>
      </View>
    );
  };

  const renderNotLoggedIn = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/illustrations/no-login.png")}
        />
        <Text style={styles.subtitle}>
          You must be logged in to use this feature.
        </Text>
        <Button
          onPress={() => returnToLogin()}
          type={"primary"}
          style={{ marginTop: margins.large }}
          title={"Go to Login Screen"}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Heading title="Watchlist" />
        </View>
        {isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>{renderNotLoggedIn()}</>
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
