import { FlatList } from "react-native";
import React from "react";
import theme from "../theme";
import Card from "./Card";
import { Coin } from "../model";

const { paddings } = theme;

interface Props {
  data: Coin[];
}

const CoinFlatList = ({ data }: Props) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ paddingBottom: paddings.medium }}
      data={data}
      renderItem={({ item }) => <Card coin={item} />}
      overScrollMode="never"
    />
  );
};

export default CoinFlatList;
