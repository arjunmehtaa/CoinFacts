import { View, Text, StyleSheet } from "react-native";
import React from "react";
import theme from "../theme";

const { colors, fontSizes, margins } = theme;

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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: margins.medium,
  },
  title: {
    color: colors.lightGrey,
    fontSize: fontSizes.xsmall,
    fontWeight: "bold",
  },
  divider: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.lightGrey,
  },
  left: {
    marginLeft: margins.xlarge,
    marginRight: margins.medium,
  },
  right: {
    marginLeft: margins.medium,
    marginRight: margins.xlarge,
  },
});

export default Divider;
