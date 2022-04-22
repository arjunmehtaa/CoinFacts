import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { LoadingIndicator, SearchBar } from "../components";
import { getCoin, getQueryResults, getTrending } from "../services";
import theme from "../theme";
import { Coin } from "../model";
import CoinFlatList from "../components/CoinFlatList";
import TrendingIcon from "../assets/trending.svg";
import { isValidCoin, sortCoinList } from "../utils";

const { colors, fontSizes, margins, paddings, roundedComponent } = theme;

const Search = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [trendingData, setTrendingData] = useState<Coin[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [showTrending, setShowTrending] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      setTrendingData([]);
      const trendingData = await getTrending();
      const { coins } = trendingData;
      coins.forEach(({ item }) => {
        fetchCoin(item.id);
      });
      setLoadingTrending(false);
    };
    fetchTrending();
  }, []);

  const fetchCoin = async (id: string) => {
    const coin = await getCoin(id);
    if (isValidCoin(coin[0])) {
      setTrendingData((trendingData) => [...trendingData, coin[0]]);
      setTrendingData((trendingData) => sortCoinList(trendingData));
    }
  };

  const fetchQueryResults = async (formattedQuery: string) => {
    const queryResults = await getQueryResults(formattedQuery);
    const { coins } = queryResults;
    setData(coins);
    setLoadingSearch(false);
  };

  const handleTextChange = (text: string) => {
    setQuery(text);
    if (!text) setShowTrending(true);
  };

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    setShowTrending(false);
    if (text.length > 2) {
      setLoadingSearch(true);
      setData([]);
      fetchQueryResults(formattedQuery);
    } else if (text.length === 0) {
      setData([]);
      setQuery("");
      setShowTrending(true);
    } else {
      setLoadingSearch(false);
    }
  };

  const renderTrending = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Trending on CoinFacts</Text>
          <TrendingIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
          />
        </View>
        {loadingTrending ? (
          <LoadingIndicator />
        ) : (
          <CoinFlatList data={trendingData} fromSearch={false} />
        )}
      </View>
    );
  };

  const renderSearchResults = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Search Results</Text>
        {loadingSearch ? (
          <LoadingIndicator />
        ) : (
          <>
            {query.length > 2 ? (
              <CoinFlatList data={data} fromSearch={true} />
            ) : (
              <View style={styles.card}>
                <Text>Search quereies must be 3 or more characters.</Text>
              </View>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        query={query}
        handleSearch={handleSearch}
        handleTextChange={handleTextChange}
      />
      {showTrending ? renderTrending() : renderSearchResults()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: colors.translucentGrey,
    borderRadius: roundedComponent.borderRadius,
    flexDirection: "row",
    marginHorizontal: margins.large,
    marginVertical: margins.medium,
    padding: paddings.medium,
  },
  title: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.darkGrey,
    marginLeft: margins.large,
    marginRight: margins.medium,
    marginVertical: margins.medium,
  },
});

export default Search;
