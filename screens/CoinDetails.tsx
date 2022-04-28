import {
  View,
  Text,
  Image,
  StyleSheet,
  Vibration,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Coin } from "../model";
import theme from "../theme";
import { formatPrice, isValidCoin } from "../utils";
import { RoundedText, ToastMessage } from "../components";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { getAuth } from "firebase/auth";
import BackIcon from "../assets/icons/back.svg";
import WatchlistIcon from "../assets/icons/watchlist.svg";
import WatchlistFilledIcon from "../assets/icons/watchlist-filled.svg";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { showToast } from "../components/ToastMessage";

const { colors, commonStyles, margins, fontSizes, paddings } = theme;

const CoinDetails = ({ route }) => {
  const db = getDatabase();
  const user = getAuth().currentUser;
  const userId = user?.uid;
  const reference = ref(db, "users/" + userId);
  const navigation = useNavigation();
  const coin: Coin = route.params.coin;
  const [isWatched, setIsWatched] = useState(false);
  const [watchlist, setWatchlist] = useState("");
  const imageUri = coin.image ? coin.image : coin.large;
  const isFocused = useIsFocused();
  const color =
    coin.price_change_percentage_24h > 0 ? colors.green : colors.red;

  useEffect(() => {
    return onValue(reference, (snapshot) => {
      if (isFocused) {
        if (snapshot?.val()?.watchlist) {
          const watchlistString = snapshot?.val()?.watchlist;
          setWatchlist(watchlistString);
          if (watchlistString.includes(";" + coin.id + ";")) {
            setIsWatched(true);
          } else {
            setIsWatched(false);
          }
        } else {
          setWatchlist("");
          setIsWatched(false);
        }
      }
    });
  }, []);

  const watchlistButtonPressed = () => {
    if (user) {
      showToast(
        isWatched ? "Removed from Watchlist" : "Added to Watchlist",
        isWatched ? "error" : "success"
      );
      Vibration.vibrate(50);
      if (isWatched) {
        set(reference, {
          watchlist: watchlist.replace(";" + coin.id + ";", ""),
        });
      } else {
        set(reference, {
          watchlist: watchlist + ";" + coin.id + ";",
        });
      }
    } else {
      navigation.navigate(
        "WatchlistStack" as never,
        { screen: "WatchlistStack" } as never
      );
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
      <ScrollView style={styles.container}>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <Text style={styles.name}>{coin.name}</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <RoundedText
            title={coin.market_cap_rank}
            color={colors.grey}
            textStyle={styles.subtitle}
            containerStyle={{ marginRight: margins.small }}
          />
          <RoundedText
            title={coin.symbol.toUpperCase()}
            color={colors.blue}
            textStyle={styles.subtitle}
          />
        </View>
        <Text style={styles.price}>{formatPrice(coin.current_price)}</Text>
        <RoundedText
          title={
            (coin.price_change_percentage_24h > 0 ? "+" : "") +
            coin.price_change_percentage_24h.toFixed(2) +
            "%"
          }
          color={color}
          textStyle={styles.subtitle}
          containerStyle={{ alignSelf: "center" }}
        />
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
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon height={28} width={28} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => watchlistButtonPressed()}
        >
          {isWatched ? (
            <WatchlistFilledIcon height={28} width={28} />
          ) : (
            <WatchlistIcon height={28} width={28} />
          )}
        </TouchableOpacity>
      </View>
      {isValidCoin(coin) ? renderCoinDetails() : null}
      <ToastMessage />
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
    marginVertical: margins.large,
    alignItems: "center",
  },
  headerButton: {
    paddingHorizontal: paddings.large,
    height: 52,
    justifyContent: "center",
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
    fontSize: fontSizes.medium,
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
