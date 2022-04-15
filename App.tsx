import { StyleSheet, Text, View } from "react-native";
import { Home } from "./screens";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
      <StatusBar backgroundColor={"#ffffff"} style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: 24,
  },
});
