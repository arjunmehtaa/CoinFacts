import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Coin } from "../model";
import theme from "../theme";
import { getCoin } from "../services";
import { isValidCoin } from "../utils";
import { LoadingIndicator } from "../components";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { getAuth } from "firebase/auth";
import BackIcon from "../assets/back.svg";
import WatchlistIcon from "../assets/watchlist.svg";
import WatchlistFilledIcon from "../assets/watchlist-filled.svg";
import { useNavigation } from "@react-navigation/native";

const { colors, commonStyles, margins, fontSizes } = theme;

const CoinDetails = ({ route }) => {
  const db = getDatabase();
  const userId = getAuth().currentUser?.uid;
  const reference = ref(db, "users/" + userId);
  const navigation = useNavigation();
  const receivedCoin: Coin = route.params.coin;
  const fromSearch: boolean = route.params.fromSearch;
  const [coin, setCoin] = useState<Coin>(receivedCoin);
  const [loading, setloading] = useState(true);
  const [isWatched, setIsWatched] = useState(false);
  const [watchlist, setWatchlist] = useState("");
  const imageUri = coin.image ? coin.image : coin.large;
  const color =
    coin.price_change_percentage_24h > 0 ? colors.green : colors.red;

  const fetchCoin = async (id: string) => {
    const coin = await getCoin(id);
    if (isValidCoin(coin[0])) {
      setCoin(coin[0]);
      setloading(false);
    }
  };

  useEffect(() => {
    const shouldFetchCoin = async () => {
      if (fromSearch) {
        fetchCoin(coin.id);
      } else {
        setloading(false);
      }
    };
    shouldFetchCoin();
    return onValue(reference, (snapshot) => {
      if (snapshot?.val()?.watchlist) {
        const watchlistString = snapshot?.val()?.watchlist;
        setWatchlist(watchlistString);
        if (watchlistString.includes(";" + coin.id + ";")) {
          setIsWatched(true);
        } else {
          setIsWatched(false);
        }
      } else {
        setIsWatched(false);
      }
    });
  }, []);

  const watchlistButtonPressed = () => {
    if (isWatched) {
      set(reference, {
        watchlist: watchlist.replace(";" + coin.id + ";", ""),
      });
    } else {
      set(reference, {
        watchlist: watchlist + ";" + coin.id + ";",
      });
    }
  };

  const Row = ({ heading, value }) => {
    return (
      <View style={styles.row}>
        <View style={{ width: "50%" }}>
          <Text style={styles.rowKey}>{heading}</Text>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={styles.rowValue}>{value}</Text>
        </View>
      </View>
    );
  };

  const renderCoinDetails = () => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <Text style={styles.name}>{coin.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={[
              styles.subtitle,
              commonStyles.textCard,
              commonStyles.coinRank,
            ]}
          >
            {coin.market_cap_rank}
          </Text>
          <Text style={[styles.subtitle, commonStyles.textCard]}>
            {coin.symbol.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.price}>${coin.current_price}</Text>
        <Text
          style={[
            styles.subtitle,
            commonStyles.textCard,
            {
              backgroundColor: color + "10",
              borderColor: color,
              color: color,
            },
          ]}
        >
          {(coin.price_change_percentage_24h > 0 ? "+" : "") +
            coin.price_change_percentage_24h.toFixed(2)}
          %
        </Text>
        <View style={[commonStyles.card, { marginVertical: margins.large }]}>
          <Row heading={"Market Cap"} value={"$" + coin.market_cap} />
          {coin.fully_diluted_valuation ? (
            <Row
              heading={"Fully Diluted Valuation"}
              value={"$" + coin.fully_diluted_valuation}
            />
          ) : null}
          <Row heading={"Trading Volume"} value={"$" + coin.total_volume} />
          <Row heading={"24H High"} value={"$" + coin.high_24h} />
          <Row heading={"24H Low"} value={"$" + coin.low_24h} />
          <Row heading={"Available Supply"} value={coin.circulating_supply} />
          <Row heading={"Total Supply"} value={coin.total_supply} />
          {coin.max_supply ? (
            <Row heading={"Max Supply"} value={coin.max_supply} />
          ) : null}
          <Row heading={"All Time High"} value={"$" + coin.ath} />
          <Row heading={"All Time Low"} value={"$" + coin.atl} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackIcon onPress={() => navigation.goBack()} height={28} width={28} />
        {isWatched ? (
          <WatchlistFilledIcon
            onPress={() => watchlistButtonPressed()}
            height={28}
            width={28}
          />
        ) : (
          <WatchlistIcon
            onPress={() => watchlistButtonPressed()}
            height={28}
            width={28}
          />
        )}
      </View>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>{isValidCoin(coin) ? renderCoinDetails() : null}</>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: margins.large,
    alignItems: "center",
  },
  image: {
    width: 64,
    height: 64,
    margin: margins.large,
    alignSelf: "center",
  },
  name: {
    fontSize: fontSizes.large,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    alignSelf: "center",
    fontSize: fontSizes.medium,
    marginHorizontal: margins.small,
  },
  price: {
    fontSize: fontSizes.xlarge,
    fontWeight: "bold",
    marginTop: margins.large,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    margin: margins.medium,
  },
  rowKey: {
    fontSize: fontSizes.small,
    color: colors.grey,
    fontWeight: "bold",
  },
  rowValue: {
    fontSize: fontSizes.small,
    color: colors.grey,
    textAlign: "right",
  },
});

export default CoinDetails;
