import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import { Coin } from "../model";
import { useNavigation } from "@react-navigation/native";

const { colors, fontSizes, image, margins, paddings, roundedComponent } = theme;

interface Props {
  coin: Coin;
  fromSearch: boolean;
}

const Card = ({ coin, fromSearch }: Props) => {
  const { navigate } = useNavigation();
  const imageUri = coin.image ? coin.image : coin.large;
  const color =
    coin.price_change_percentage_24h > 0 ? colors.green : colors.red;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.5}
      onPress={() =>
        navigate(
          "CoinDetails" as never,
          { screen: "CoinDetails", coin: coin, fromSearch: fromSearch } as never
        )
      }
    >
      <View style={{ flexDirection: "row", width: "65%" }}>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            width: "80%",
          }}
        >
          <Text style={styles.title} numberOfLines={1}>
            {coin.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.subtitle, styles.rank]}>
              {coin.market_cap_rank}
            </Text>
            <Text style={styles.subtitle}>{coin.symbol.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      {coin.current_price && coin.price_change_percentage_24h ? (
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-end",
            width: "35%",
          }}
        >
          <Text style={styles.title}>${coin.current_price}</Text>
          <Text
            style={[
              styles.subtitle,
              {
                backgroundColor: color + "10",
                borderColor: color,
                color: color,
                textAlign: "right",
              },
            ]}
          >
            {(coin.price_change_percentage_24h > 0 ? "+" : "") +
              coin.price_change_percentage_24h.toFixed(2)}
            %
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.translucentGrey,
    borderRadius: roundedComponent.borderRadius,
    flexDirection: "row",
    marginHorizontal: margins.large,
    marginVertical: margins.medium,
    padding: paddings.medium,
  },
  image: {
    alignSelf: "center",
    height: image.height,
    width: image.width,
    marginRight: margins.large,
  },
  title: {
    fontSize: fontSizes.medium,
    fontWeight: "bold",
  },
  subtitle: {
    backgroundColor: colors.blue + "10",
    borderRadius: roundedComponent.borderRadius,
    color: colors.blue,
    fontSize: fontSizes.small,
    fontWeight: "bold",
    marginTop: margins.small,
    padding: paddings.small,
  },
  rank: {
    marginRight: margins.small,
    backgroundColor: colors.grey + "10",
    borderColor: colors.grey,
    color: colors.grey,
  },
});

export default Card;
