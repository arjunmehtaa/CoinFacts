import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../theme";
import { Heading, LoadingIndicator, NewsCard } from "../components";
import { getNews } from "../services/cryptoService";
import { NewsItem } from "../model";
import { FlatList } from "react-native-gesture-handler";

const { colors, paddings } = theme;

const News = () => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      const trendingData: NewsItem[] = await getNews();
      setData(trendingData);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  return (
    <View style={styles.container}>
      <Heading title="News" />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => <NewsCard newsItem={item} />}
          keyExtractor={(item) => item.url}
          initialNumToRender={10}
          contentContainerStyle={{ paddingBottom: paddings.medium }}
          keyboardShouldPersistTaps="handled"
          overScrollMode="never"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

export default News;
