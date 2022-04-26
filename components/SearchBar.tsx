import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import SearchIcon from "../assets/search.svg";
import Cancel from "../assets/cancel.svg";
import theme from "../theme";
import { useIsFocused } from "@react-navigation/native";

const { colors, fontSizes, margins, paddings, roundedComponent } = theme;

interface Props {
  query: string;
  handleSearch: (queryText: string) => void;
  handleTextChange: (queryText: string) => void;
}

const SearchBar = ({ query, handleSearch, handleTextChange }: Props) => {
  const inputRef = React.createRef<TextInput>();
  const [text, setText] = useState("");
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      if (text.length === 0) inputRef.current?.focus();
    }
  }, [isFocused]);
  return (
    <TouchableOpacity
      style={styles.searchContainer}
      onPress={() => inputRef.current?.focus()}
    >
      <SearchIcon
        width={20}
        height={20}
        style={{ alignSelf: "center", marginRight: margins.small }}
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={query}
        onChangeText={(queryText) => {
          handleTextChange(queryText);
          setText(queryText);
        }}
        onSubmitEditing={(event) => {
          handleSearch(event.nativeEvent.text);
        }}
        placeholder="Search CoinFacts"
        placeholderTextColor={colors.lightGrey}
        style={styles.searchInput}
        returnKeyType={"search"}
        ref={inputRef}
        autoFocus={true}
        selectionColor={colors.black}
      />
      {query ? (
        <Cancel
          width={20}
          height={20}
          style={{ alignSelf: "center", marginRight: margins.small }}
          onPress={() => {
            inputRef.current?.clear();
            setText("");
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
    marginBottom: margins.medium,
    marginTop: margins.large,
    padding: paddings.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.medium,
  },
});

export default SearchBar;
