import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { AuthContext } from "../contexts/UserContext";
import theme from "../theme";
import EmailIcon from "../assets/icons/email.svg";
import PasswordIcon from "../assets/icons/password.svg";
import VisibilityOnIcon from "../assets/icons/visibilityOn.svg";
import VisibilityOffIcon from "../assets/icons/visibilityOff.svg";
import { Button, Divider, Heading } from "../components";

const { colors, margins, fontSizes, paddings, roundedComponent } = theme;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn, signUp, continueWithoutLogging } =
    React.useContext(AuthContext);
  const emailInputRef = React.createRef<TextInput>();
  const passwordInputRef = React.createRef<TextInput>();

  const handleSignIn = (email: string, password: string) => {
    if (!email) {
      Alert.alert("Login Failed", "Please enter your email.");
    } else if (!password) {
      Alert.alert("Login Failed", "Please enter your password.");
    } else {
      if (isRegister) signUp(email.trim(), password);
      else signIn(email.trim(), password);
    }
  };

  const togglePasswordVisibility = () => {
    isPasswordVisible
      ? setIsPasswordVisible(false)
      : setIsPasswordVisible(true);
  };

  const renderFooter = () => {
    return (
      <>
        <Button
          onPress={() => handleSignIn(email, password)}
          type={"primary"}
          title={isRegister ? "Register" : "Login"}
        />
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {isRegister ? "Already have an account?" : "New to CoinFacts?"}
          </Text>
          <Text
            style={[styles.footerText, styles.registerText]}
            onPress={() => {
              isRegister ? setIsRegister(false) : setIsRegister(true);
              emailInputRef.current?.clear();
              passwordInputRef.current?.clear();
            }}
          >
            {isRegister ? "Login" : "Register"}
          </Text>
        </View>
        <Divider title="OR" />
        <Button
          onPress={() => continueWithoutLogging()}
          type={"secondary"}
          title={"Continue as Guest"}
        />
      </>
    );
  };

  const renderPasswordVisibilityButton = () => {
    return (
      <TouchableOpacity
        style={styles.visibilityContainer}
        onPress={() => {
          togglePasswordVisibility();
        }}
      >
        {isPasswordVisible ? (
          <VisibilityOffIcon width={20} height={20} fill={colors.lightGrey} />
        ) : (
          <VisibilityOnIcon width={20} height={20} fill={colors.lightGrey} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading title={isRegister ? "Register" : "Login"} />
      <TouchableOpacity
        style={styles.textInputContainer}
        onPress={() => emailInputRef.current?.focus()}
      >
        <EmailIcon
          width={20}
          height={20}
          fill={colors.lightGrey}
          style={{ alignSelf: "center", marginRight: margins.medium }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          ref={emailInputRef}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={colors.black}
          style={styles.textInput}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.textInputContainer}
        onPress={() => passwordInputRef.current?.focus()}
      >
        <PasswordIcon
          width={20}
          height={20}
          fill={colors.lightGrey}
          style={{ alignSelf: "center", marginRight: margins.medium }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          ref={passwordInputRef}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={colors.black}
          style={styles.textInput}
          secureTextEntry={isPasswordVisible ? false : true}
        />
        {renderPasswordVisibilityButton()}
      </TouchableOpacity>
      {renderFooter()}
      <View style={{ flex: 1 }}>
        <Image
          style={styles.imageStyle}
          source={
            isRegister
              ? require("../assets/illustrations/register.png")
              : require("../assets/illustrations/login.png")
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: fontSizes.xlarge,
    marginHorizontal: margins.large,
    marginVertical: margins.xlarge,
    color: colors.darkGrey,
  },
  footerText: {
    paddingTop: paddings.small,
    paddingBottom: paddings.large,
    fontSize: 14,
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
  textInput: {
    flex: 1,
    fontSize: fontSizes.medium,
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
  },
  visibilityContainer: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: paddings.medium,
  },
  textInputContainer: {
    height: 48,
    backgroundColor: colors.translucentGrey,
    borderRadius: roundedComponent.borderRadius,
    flexDirection: "row",
    marginHorizontal: margins.large,
    marginVertical: margins.medium,
    paddingLeft: paddings.medium,
  },
});

export default Login;
