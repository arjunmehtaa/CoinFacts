import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React, { memo, useState } from "react";
import theme from "../theme";
import { NewsItem } from "../model";
import * as WebBrowser from "expo-web-browser";

const { colors, paddings, margins, roundedComponent, fontSizes } = theme;

interface Props {
  newsItem: NewsItem;
}

const NewsCard = ({ newsItem }: Props) => {
  const [result, setResult] = useState<WebBrowser.WebBrowserResult>();

  const handleCardPressed = async () => {
    let result = await WebBrowser.openBrowserAsync(newsItem.url);
    setResult(result);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={handleCardPressed}
        activeOpacity={0.5}
      >
        <Image style={styles.image} source={{ uri: newsItem.urlToImage }} />
        <Text style={styles.title}>{newsItem.title}</Text>
      </TouchableOpacity>
      <Text style={styles.json}>{result && JSON.stringify(result)}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.translucentGrey,
    borderRadius: roundedComponent.borderRadius,
    marginHorizontal: margins.large,
    marginVertical: margins.medium,
  },
  image: {
    aspectRatio: 1,
    width: "25%",
    borderTopLeftRadius: roundedComponent.borderRadius,
    borderBottomLeftRadius: roundedComponent.borderRadius,
  },
  title: {
    padding: paddings.medium,
    width: "75%",
    fontSize: fontSizes.medium,
    color: colors.darkGrey,
  },
  json: {
    fontSize: 0,
    opacity: 0,
    height: 0,
    width: 0,
  },
});

export default memo(NewsCard);
