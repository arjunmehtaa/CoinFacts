import React, { useEffect, useState } from "react";
import theme from "../theme";
import { RefreshControl, SafeAreaView, StyleSheet } from "react-native";
import {
  CoinFlatList,
  LoadingIndicator,
  PlaceholderSearchBar,
} from "../components";
import { getMarketData } from "../services";
import { Coin } from "../model";
import { useNavigation } from "@react-navigation/native";

const { colors, paddings } = theme;

const Home = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  const fetchMarketData = async () => {
    setLoading(true);
    const marketData = await getMarketData();
    setData(marketData);
    setLoading(false);
  };

  useEffect(() => {
    fetchMarketData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <PlaceholderSearchBar
            onPress={() => {
              navigate("SearchStack" as never, { screen: "Search" } as never);
            }}
          />
          <CoinFlatList
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => fetchMarketData()}
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  flatlist: {
    paddingBottom: paddings.medium,
  },
});

export default Home;
