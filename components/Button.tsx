import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import theme from "../theme";

const { colors, margins, paddings, roundedComponent, fontSizes } = theme;

interface Props {
  onPress: () => void;
  type: string;
  title: string;
  style?: StyleProp<TextStyle> | undefined;
}

const Button = ({ onPress, title, type, style }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.button,
        style,
        { backgroundColor: type == "primary" ? colors.blue : colors.white },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: type == "primary" ? colors.white : colors.blue },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    paddingVertical: paddings.medium,
    paddingHorizontal: paddings.large,
    marginVertical: margins.medium,
    marginHorizontal: margins.large,
    borderRadius: roundedComponent.borderRadius,
    borderColor: colors.blue,
    backgroundColor: colors.blue,
    borderWidth: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSizes.medium,
    color: colors.white,
  },
});

export default Button;
