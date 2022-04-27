import React, { useEffect, useState } from "react";
import theme from "../theme";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  CoinFlatList,
  LoadingIndicator,
  PlaceholderSearchBar,
} from "../components";
import { getMarketData } from "../services";
import { Coin } from "../model";
import { useNavigation } from "@react-navigation/native";

const { colors } = theme;

const Home = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData!);
      setLoading(false);
    };
    fetchMarketData();
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
          <CoinFlatList data={data} />
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
});

export default Home;
