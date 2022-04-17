import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        style={{ alignSelf: "center" }}
        color={"black"}
        size={"large"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LoadingIndicator;
