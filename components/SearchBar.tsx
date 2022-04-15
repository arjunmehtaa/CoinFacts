import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import SearchIcon from "../assets/search.svg";
import Cancel from "../assets/cancel.svg";
import theme from "../theme";

const { colors, fontSizes, margins, paddings, roundedComponent } = theme;

interface Props {
  query: string;
  handleSearch: (queryText: string) => void;
}

const SearchBar = ({ query, handleSearch }: Props) => {
  const inputRef = React.createRef<TextInput>();
  return (
    <TouchableOpacity style={styles.searchContainer}>
      <SearchIcon
        width={20}
        height={20}
        style={{ alignSelf: "center", marginRight: margins.small }}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={query}
        onChangeText={(queryText) => handleSearch(queryText)}
        placeholder="Search CoinFacts"
        placeholderTextColor={colors.lightGrey}
        style={styles.searchInput}
        ref={inputRef}
        selectionColor={colors.black}
      />
      {query ? (
        <Cancel
          width={20}
          height={20}
          style={{ alignSelf: "center", marginRight: margins.small }}
          onPress={() => {
            inputRef.current?.clear();
            handleSearch("");
          }}
        />
      ) : null}
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
    marginVertical: margins.medium,
    padding: paddings.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.medium,
  },
});

export default SearchBar;
