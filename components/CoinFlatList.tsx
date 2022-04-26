import { FlatList } from "react-native";
import React from "react";
import theme from "../theme";
import Card from "./Card";
import { Coin } from "../model";

const { paddings } = theme;

interface Props {
  data: Coin[];
  fromSearch: boolean;
}

const CoinFlatList = ({ data, fromSearch }: Props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: paddings.medium }}
      data={data}
      renderItem={({ item }) => <Card coin={item} fromSearch={fromSearch} />}
      overScrollMode="never"
    />
  );
};

export default CoinFlatList;
