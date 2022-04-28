import { View, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { CoinFlatList, LoadingIndicator, SearchBar } from "../components";
import { getCoins, getQueryResults, getTrending } from "../services";
import theme from "../theme";
import { Coin } from "../model";
import TrendingIcon from "../assets/icons/trending.svg";

const { colors, fontSizes, margins } = theme;

const Search = () => {
  const [searchData, setSearchData] = useState<Coin[]>([]);
  const [trendingData, setTrendingData] = useState<Coin[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [showTrending, setShowTrending] = useState(true);
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      const trendingData = await getTrending();
      const { coins } = trendingData;
      fetchCoins(coins, true);
    };
    fetchTrending();
  }, []);

  const fetchCoins = async (coins, isTrending: boolean) => {
    const idsArray: string[] = [];
    if (isTrending) {
      coins.forEach(({ item }) => {
        idsArray.push(item.id);
      });
    } else {
      coins.forEach((item) => {
        idsArray.push(item.id);
      });
    }
    const fetchedCoins = await getCoins(idsArray);
    if (isTrending) {
      setTrendingData(fetchedCoins);
      setLoadingTrending(false);
    } else {
      setSearchData(fetchedCoins);
      setLoadingSearch(false);
    }
  };

  const fetchQueryResults = async (formattedQuery: string) => {
    const queryResults = await getQueryResults(formattedQuery);
    const { coins } = queryResults;
    if (coins.length > 0) {
      fetchCoins(coins, false);
    } else {
      setSearchData([]);
      setLoadingSearch(false);
    }
  };

  const handleTextChange = (text: string) => {
    setQuery(text);
    if (!text) setShowTrending(true);
  };

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    setSearchedQuery(formattedQuery);
    setShowTrending(false);
    if (text.trim().length > 0) {
      setLoadingSearch(true);
      setSearchData([]);
      fetchQueryResults(formattedQuery);
    } else if (text.trim().length === 0) {
      setSearchData([]);
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
          <Text style={[styles.title, { marginRight: margins.medium }]}>
            Trending on CoinFacts
          </Text>
          <TrendingIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
          />
        </View>
        {loadingTrending ? (
          <LoadingIndicator />
        ) : (
          <CoinFlatList data={trendingData} />
        )}
      </View>
    );
  };

  const renderNoSearchResults = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/illustrations/no-search.png")}
        />
        <Text style={styles.subtitle}>
          We looked far, but we couldn't find that coin.{"\n"}Check the
          spellings and try again.
        </Text>
      </View>
    );
  };

  const renderSearchResults = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.title}>Search Results for </Text>
          <Text style={[styles.title, { marginLeft: 0, color: colors.blue }]}>
            {searchedQuery}
          </Text>
        </View>
        {loadingSearch ? (
          <LoadingIndicator />
        ) : (
          <>
            {searchData.length > 0 ? (
              <>
                <CoinFlatList data={searchData} />
              </>
            ) : (
              renderNoSearchResults()
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
  title: {
    fontSize: fontSizes.large,
    fontWeight: "bold",
    color: colors.darkGrey,
    marginLeft: margins.large,
    marginVertical: margins.medium,
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

export default Search;
