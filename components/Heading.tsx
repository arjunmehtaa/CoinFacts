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
    fontWeight: "bold",
    fontSize: fontSizes.xlarge,
    marginHorizontal: margins.large,
    marginVertical: margins.xlarge,
    color: colors.darkGrey,
  },
});

export default Heading;
