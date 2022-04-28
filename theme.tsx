import { StyleSheet } from "react-native";

const button = {
  height: 52,
};

const colors = {
  black: "#000000",
  blue: "#1E90FF",
  green: "#009E60",
  grey: "#666666",
  red: "#D2042D",
  white: "#FFFFFF",
  lightGrey: "#999999",
  darkGrey: "#444444",
  translucentGrey: "#00000008",
  translucentRed: "#fdeef3",
  translucentGreen: "#e8f2ef",
};

const fontSizes = {
  small: 13,
  medium: 16,
  large: 24,
  xlarge: 36,
};

const image = {
  height: 40,
  width: 40,
};

const margins = {
  small: 4,
  medium: 8,
  large: 16,
  xlarge: 24,
};

const paddings = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 16,
};

const roundedComponent = {
  borderRadius: 8,
};

const commonStyles = StyleSheet.create({
  card: {
    padding: paddings.medium,
    marginVertical: margins.medium,
    marginHorizontal: margins.large,
    borderRadius: roundedComponent.borderRadius,
    backgroundColor: colors.translucentGrey,
  },
});

const theme = {
  button,
  colors,
  commonStyles,
  fontSizes,
  image,
  margins,
  paddings,
  roundedComponent,
};

export default theme;
