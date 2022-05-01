import { FlatList, RefreshControlProps } from "react-native";
import React from "react";
import theme from "../theme";
import Card from "./Card";
import { Coin } from "../model";

const { paddings } = theme;

interface Props {
  data: Coin[];
  refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const CoinFlatList = ({ data, refreshControl }: Props) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Card coin={item} />}
      keyExtractor={(item) => item.id}
      initialNumToRender={10}
      contentContainerStyle={{ paddingBottom: paddings.medium }}
      keyboardShouldPersistTaps="handled"
      overScrollMode="never"
      refreshControl={refreshControl}
    />
  );
};

export default CoinFlatList;
