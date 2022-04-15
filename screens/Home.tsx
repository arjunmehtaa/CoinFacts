import React, { useEffect, useRef, useState } from "react";
import theme from "../theme";
import {
  Animated,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card, SearchBar } from "../components";
import { getMarketData } from "../services";
import { Coin } from "../model";
import filter from "lodash.filter";
import { getCloser } from "../utils";

const { diffClamp } = Animated;
const { colors, fontSizes, margins } = theme;

const Home = () => {
  const [data, setData] = useState<Coin[]>([]);
  const [fullData, setFullData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [query, setQuery] = useState("");
  const flatlist = useRef(null);

  const HEADER_HEIGHT = 120;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollYClamped = diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = scrollYClamped.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT + 64],
  });
  const translateYNumber = useRef();

  headerY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleSnap = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(
        translateYNumber.current === 0 ||
        translateYNumber.current === -HEADER_HEIGHT + 64
      )
    ) {
      if (flatlist.current) {
        flatlist.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -HEADER_HEIGHT + 64, 0) ===
            -HEADER_HEIGHT / 2
              ? offsetY + HEADER_HEIGHT - 64
              : offsetY - HEADER_HEIGHT + 64,
        });
      }
    }
  };

  const handleSearch = (text: string) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (coin: Coin) => {
      return contains(coin, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);

    if (!isScrolling) {
      flatlist?.current?.scrollToOffset({ animated: true, y: 0 });
      setIsScrolling(true);
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  const contains = ({ name, symbol }, query: string) => {
    if (name.toLowerCase().includes(query) || symbol.includes(query)) {
      return true;
    }
    return false;
  };

  const renderHeader = () => {
    return (
      <Animated.View
        style={[styles.header, { transform: [{ translateY: headerY }] }]}
      >
        <Text style={styles.title}>CoinFacts</Text>
        <SearchBar query={query} handleSearch={handleSearch} />
      </Animated.View>
    );
  };

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData!);
      setFullData(marketData!);
      setLoading(false);
    };
    fetchMarketData();
  }, []);

  return (
    <View style={styles.container}>
      {renderHeader()}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            color={"black"}
            size={"large"}
          />
        </View>
      ) : (
        <Animated.FlatList
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="handled"
          data={data}
          ref={flatlist}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleSnap}
          contentContainerStyle={{ paddingTop: HEADER_HEIGHT + 8 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item }) => <Card coin={item} />}
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
  header: {
    position: "absolute",
    backgroundColor: colors.white,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: colors.grey,
    margin: margins.large,
    marginBottom: margins.small,
    fontSize: fontSizes.large,
    fontWeight: "bold",
  },
});

export default Home;
