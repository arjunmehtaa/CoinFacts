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
      data={data}
      renderItem={({ item }) => <Card coin={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: paddings.medium }}
      keyboardShouldPersistTaps="handled"
      overScrollMode="never"
    />
  );
};

export default CoinFlatList;
