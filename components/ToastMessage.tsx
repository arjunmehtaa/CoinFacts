import React from "react";
import Toast, { BaseToast } from "react-native-toast-message";
import theme from "../theme";

const { colors } = theme;

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: colors.translucentGreen,
        elevation: 0,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        alignItems: "center",
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: colors.green,
      }}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftWidth: 0,
        backgroundColor: colors.translucentRed,
        elevation: 0,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        alignItems: "center",
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: colors.red,
      }}
    />
  ),
};

export const showToast = (message: string, type: string) => {
  Toast.show({
    type: type,
    text1: message,
  });
};

const ToastMessage = () => {
  return (
    <Toast
      config={toastConfig}
      position={"bottom"}
      visibilityTime={800}
      bottomOffset={0}
    />
  );
};

export default ToastMessage;
