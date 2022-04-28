import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "../theme";

const { colors, margins } = theme;

interface Props {
  title?: string;
}

const Divider = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.divider, styles.left]} />
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.divider, styles.right]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: margins.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.lightGrey,
    fontSize: 10,
    fontWeight: "bold",
  },
  divider: {
    flex: 1,
    height: 0.5,
    borderRadius: 100,
    backgroundColor: colors.lightGrey,
  },
  left: {
    marginLeft: margins.xlarge,
    marginRight: margins.medium,
  },
  right: {
    marginRight: margins.xlarge,
    marginLeft: margins.medium,
  },
});

export default Divider;
