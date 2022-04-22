import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AuthContext } from "../contexts/UserContext";

const Profile = ({ user }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>
      <TouchableOpacity
        onPress={() => signOut()}
        style={[styles.roundedComponent, styles.primaryButton]}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 36,
    marginHorizontal: 8,
    marginVertical: 24,
    color: "#444444",
  },
  roundedComponent: {
    paddingHorizontal: 16,
    height: 52,
    margin: 8,
    borderRadius: 8,
    backgroundColor: "#00000008",
  },
  primaryButton: {
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: "#1E90FF",
  },
  secondaryButton: {
    borderWidth: 2,
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#1E90FF",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default Profile;
