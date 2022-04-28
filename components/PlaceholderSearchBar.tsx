import { Platform, StyleSheet, Text, TouchableOpacity } from "react-native";
import SearchIcon from "../assets/icons/search.svg";
import theme from "../theme";

const { colors, fontSizes, margins, paddings, roundedComponent } = theme;

interface Props {
  onPress: () => void;
}

const SearchBar = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.searchContainer}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <SearchIcon width={20} height={20} style={styles.icon} />
      <Text style={styles.searchInput}>Search CoinFacts</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    height: 48,
    backgroundColor: colors.translucentGrey,
    borderRadius: roundedComponent.borderRadius,
    marginHorizontal: margins.large,
    marginBottom: margins.medium,
    marginTop: Platform.OS === "android" ? margins.large : margins.medium,
    padding: paddings.medium,
  },
  searchInput: {
    color: colors.lightGrey,
    alignSelf: "center",
    flex: 1,
    fontSize: fontSizes.medium,
  },
  icon: {
    alignSelf: "center",
    marginRight: margins.small,
  },
});

export default SearchBar;
