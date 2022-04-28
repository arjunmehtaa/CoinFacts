import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SearchIcon from "../assets/icons/search.svg";
import Cancel from "../assets/icons/cancel.svg";
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
      <SearchIcon width={20} height={20} style={styles.icon} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={query}
        onChangeText={(queryText) => {
          handleTextChange(queryText);
          setText(queryText);
        }}
        onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
        placeholder="Search CoinFacts"
        placeholderTextColor={colors.lightGrey}
        style={styles.searchInput}
        returnKeyType={"search"}
        ref={inputRef}
        autoFocus={true}
        selectionColor={colors.black}
      />
      {query ? (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            inputRef.current?.clear();
            setText("");
            handleSearch("");
          }}
        >
          <Cancel width={20} height={20} />
        </TouchableOpacity>
      ) : null}
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
    paddingLeft: paddings.medium,
  },
  buttonContainer: {
    justifyContent: "center",
    height: 48,
    paddingHorizontal: paddings.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.medium,
  },
  icon: {
    alignSelf: "center",
    marginRight: margins.small,
  },
});

export default SearchBar;
