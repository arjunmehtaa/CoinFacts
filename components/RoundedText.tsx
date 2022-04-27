import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import React from "react";
import theme from "../theme";

const { colors, fontSizes, paddings, margins, roundedComponent } = theme;

interface Props {
  textStyle?: StyleProp<TextStyle> | undefined;
  containerStyle?: StyleProp<TextStyle> | undefined;
  title: number | string;
  color: string;
}

const RoundedText = ({ title, color, textStyle, containerStyle }: Props) => {
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        { backgroundColor: color + "10" },
      ]}
    >
      <Text style={[styles.text, textStyle, { color: color }]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: roundedComponent.borderRadius,
    paddingVertical: paddings.xsmall,
    paddingHorizontal: paddings.small,
    marginTop: margins.small,
  },
  text: {
    fontWeight: "bold",
    fontSize: fontSizes.small,
  },
});

export default RoundedText;
