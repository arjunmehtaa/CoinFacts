import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { AuthContext } from "../contexts/UserContext";
import theme from "../theme";
import { Heading, RoundedText } from "../components";
import ProfileIcon from "../assets/icons/profile.svg";
import AppearanceIcon from "../assets/icons/appearance.svg";

const { colors, margins, commonStyles, fontSizes } = theme;

const Settings = ({ user }) => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Heading title="Settings" style={{ marginBottom: margins.small }} />
      <ScrollView>
        <View style={[commonStyles.card, { flexDirection: "row" }]}>
          <ProfileIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
            height={40}
            width={40}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Signed in as</Text>
            <RoundedText title={user.email} color={colors.grey} />
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
      <TouchableOpacity
        onPress={() => signOut()}
        style={[
          commonStyles.card,
          commonStyles.button,
          { marginBottom: margins.large },
        ]}
      >
        <Text style={commonStyles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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
