import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import theme from "../theme";

const { colors, fontSizes, margins } = theme;

interface Props {
  title: string;
  style?: StyleProp<TextStyle> | undefined;
}

const Heading = ({ title, style }: Props) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: colors.darkGrey,
    fontSize: fontSizes.xlarge,
    fontWeight: "bold",
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.xlarge,
  },
});

export default Heading;
