import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
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
import { Heading } from "../components";

const { colors, commonStyles, margins, fontSizes, paddings } = theme;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn, signUp } = React.useContext(AuthContext);
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
        <TouchableOpacity
          onPress={() => handleSignIn(email, password)}
          style={[commonStyles.card, commonStyles.button]}
        >
          <Text style={commonStyles.buttonText}>
            {isRegister ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
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
      </>
    );
  };

  const renderPasswordVisibilityButton = () => {
    return (
      <>
        {password ? (
          <>
            {isPasswordVisible ? (
              <VisibilityOffIcon
                width={20}
                height={20}
                fill={colors.lightGrey}
                style={{ alignSelf: "center", marginRight: margins.small }}
                onPress={() => {
                  togglePasswordVisibility();
                }}
              />
            ) : (
              <VisibilityOnIcon
                width={20}
                height={20}
                fill={colors.lightGrey}
                style={{ alignSelf: "center", marginRight: margins.small }}
                onPress={() => {
                  togglePasswordVisibility();
                }}
              />
            )}
          </>
        ) : null}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <Heading title={isRegister ? "Register" : "Login"} />
        <TouchableOpacity
          style={[commonStyles.card, { flexDirection: "row" }]}
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
            style={styles.inputText}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[commonStyles.card, { flexDirection: "row" }]}
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
            style={styles.inputText}
            secureTextEntry={isPasswordVisible ? false : true}
          />
          {renderPasswordVisibilityButton()}
        </TouchableOpacity>
        {renderFooter()}
      </KeyboardAvoidingView>
      <Image
        style={styles.imageStyle}
        source={
          isRegister
            ? require("../assets/illustrations/register.png")
            : require("../assets/illustrations/login.png")
        }
      />
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
  inputText: {
    flex: 1,
    fontSize: fontSizes.medium,
  },
  imageStyle: {
    height: Dimensions.get("window").height / 2,
    width: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: "center",
  },
});

export default Login;
