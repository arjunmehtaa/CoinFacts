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
import EmailIcon from "../assets/email.svg";
import PasswordIcon from "../assets/password.svg";
import VisibilityOnIcon from "../assets/visibilityOn.svg";
import VisibilityOffIcon from "../assets/visibilityOff.svg";

const { colors, button, margins, fontSizes, paddings, roundedComponent } =
  theme;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn } = React.useContext(AuthContext);
  const emailInputRef = React.createRef<TextInput>();
  const passwordInputRef = React.createRef<TextInput>();

  const handleSignIn = (email: string, password: string) => {
    if (!email) {
      Alert.alert("Login Failed", "Please enter your email.");
    } else if (!password) {
      Alert.alert("Login Failed", "Please enter your password.");
    } else {
      signIn(email.trim(), password);
    }
  };

  const changePasswordVisibility = () => {
    isPasswordVisible
      ? setIsPasswordVisible(false)
      : setIsPasswordVisible(true);
  };

  const renderFooter = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => handleSignIn(email, password)}
          style={[styles.roundedComponent, styles.button]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>New to CoinFacts?</Text>
          <Text style={[styles.footerText, styles.registerText]}>Register</Text>
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
                  changePasswordVisibility();
                }}
              />
            ) : (
              <VisibilityOnIcon
                width={20}
                height={20}
                fill={colors.lightGrey}
                style={{ alignSelf: "center", marginRight: margins.small }}
                onPress={() => {
                  changePasswordVisibility();
                }}
              />
            )}
          </>
        ) : null}
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
        <TouchableOpacity
          style={[styles.roundedComponent, { flexDirection: "row" }]}
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
          style={[styles.roundedComponent, { flexDirection: "row" }]}
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
    padding: paddings.medium,
    marginVertical: margins.medium,
    marginHorizontal: margins.large,
    borderRadius: roundedComponent.borderRadius,
    backgroundColor: colors.translucentGrey,
  },
  button: {
    justifyContent: "center",
    backgroundColor: colors.blue,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSizes.medium,
    color: colors.white,
  },
  footerText: {
    marginTop: margins.medium,
    marginBottom: margins.large,
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
    height: Dimensions.get("window").width / 1.2,
    width: 350,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 64,
    marginBottom: margins.large,
  },
});

export default Login;
