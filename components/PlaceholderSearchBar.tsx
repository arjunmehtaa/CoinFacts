import { StyleSheet, Text, TouchableOpacity } from "react-native";
import SearchIcon from "../assets/search.svg";
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
      <SearchIcon
        width={20}
        height={20}
        style={{ alignSelf: "center", marginRight: margins.small }}
      />
      <Text style={styles.searchInput}>Search CoinFacts</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 48,
    backgroundColor: colors.translucentGrey,
    borderRadius: roundedComponent.borderRadius,
    flexDirection: "row",
    marginHorizontal: margins.large,
    marginBottom: margins.medium,
    marginTop: margins.large,
    padding: paddings.medium,
  },
  searchInput: {
    color: colors.lightGrey,
    alignSelf: "center",
    flex: 1,
    fontSize: fontSizes.medium,
  },
});

export default SearchBar;
