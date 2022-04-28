import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import theme from "../theme";

const { colors, fontSizes, margins, paddings, roundedComponent } = theme;

interface Props {
  onPress: () => void;
  type: string;
  title: string;
  style?: StyleProp<ViewStyle> | undefined;
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
    backgroundColor: colors.blue,
    borderColor: colors.blue,
    borderRadius: roundedComponent.borderRadius,
    borderWidth: 1,
    marginHorizontal: margins.large,
    marginVertical: margins.medium,
    paddingHorizontal: paddings.large,
    paddingVertical: paddings.medium,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.medium,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Button;
