import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { AuthContext } from "../contexts/UserContext";
import theme from "../theme";
import { Button, Heading, RoundedText } from "../components";
import ProfileIcon from "../assets/icons/profile.svg";
import AppearanceIcon from "../assets/icons/appearance.svg";

const { colors, margins, commonStyles, fontSizes } = theme;

const Settings = ({ user }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Heading title="Settings" />
      <ScrollView>
        <View style={[commonStyles.card, { flexDirection: "row" }]}>
          <ProfileIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
            height={40}
            width={40}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {user ? "Logged in as" : "Not logged in"}
            </Text>
            <RoundedText
              title={user ? user.email : "Click here to Login"}
              color={colors.grey}
            />
          </View>
        </View>
        <View style={[commonStyles.card, { flexDirection: "row" }]}>
          <AppearanceIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
            height={40}
            width={40}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Appearance</Text>
            <RoundedText title={"Light Theme"} color={colors.grey} />
          </View>
        </View>
      </ScrollView>
      <Button
        onPress={() => signOut()}
        type={"primary"}
        style={{ marginBottom: margins.large }}
        title={"Sign Out"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textContainer: {
    marginLeft: margins.large,
  },
  title: {
    color: colors.darkGrey,
    marginBottom: 2,
    fontSize: fontSizes.medium,
    fontWeight: "bold",
  },
});

export default Settings;
