import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../contexts/UserContext";
import theme from "../theme";

const { colors, button, margins, fontSizes, paddings, roundedComponent } =
  theme;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);

  const handleSignIn = (email: string, password: string) => {
    if (!email) {
      Alert.alert("Login Failed", "Please enter your email.");
    } else if (!password) {
      Alert.alert("Login Failed", "Please enter your password.");
    } else {
      signIn(email.trim(), password);
    }
  };

  const renderFooter = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => handleSignIn(email, password)}
          style={[styles.roundedComponent, styles.primaryButton]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>New to Coinfacts? </Text>
          <Text style={[styles.footerText, styles.registerText]}>Register</Text>
        </View>
      </>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
        <Image
          style={styles.imageStyle}
          source={require("../assets/welcome.png")}
        />
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.roundedComponent}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          selectionColor={colors.black}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.roundedComponent}
          placeholder="Password"
          value={password}
          selectionColor={colors.black}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
      </ScrollView>
      {renderFooter()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSizes.xlarge,
    marginHorizontal: margins.large,
    marginVertical: margins.xlarge,
    color: colors.darkGrey,
  },
  roundedComponent: {
    height: button.height,
    paddingHorizontal: paddings.large,
    marginVertical: margins.medium,
    marginHorizontal: margins.large,
    borderRadius: roundedComponent.borderRadius,
    backgroundColor: colors.translucentGrey,
  },
  primaryButton: {
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white,
  },
  footerText: {
    marginTop: margins.medium,
    marginBottom: margins.large,
    fontWeight: "bold",
    color: colors.lightGrey,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: colors.blue,
    marginHorizontal: margins.small,
  },
  imageStyle: {
    height: Dimensions.get("window").width / 1.2,
    width: 350,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 64,
    marginBottom: margins.large,
  },
});

export default Login;
