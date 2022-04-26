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
import { Heading } from "../components";
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
          <View>
            <Text style={styles.title}>Signed in as</Text>
            <Text
              style={[
                commonStyles.textCard,
                commonStyles.coinRank,
                styles.subtitle,
              ]}
            >
              {user.email}
            </Text>
          </View>
        </View>
        <View
          style={[
            commonStyles.card,
            {
              flexDirection: "row",
            },
          ]}
        >
          <AppearanceIcon
            style={{ alignSelf: "center" }}
            fill={colors.darkGrey}
            height={40}
            width={40}
          />
          <View>
            <Text style={styles.title}>Appearance</Text>
            <Text
              style={[
                commonStyles.textCard,
                commonStyles.coinRank,
                styles.subtitle,
              ]}
            >
              Light Theme
            </Text>
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
  title: {
    color: colors.darkGrey,
    marginBottom: 2,
    fontSize: fontSizes.medium,
    fontWeight: "bold",
    marginHorizontal: margins.large,
  },
  divider: {
    height: 1,
    backgroundColor: "#efefef",
    borderRadius: 100,
    marginHorizontal: margins.large,
    marginVertical: margins.large,
  },
  subtitle: {
    marginHorizontal: 14,
    fontWeight: "bold",
    marginTop: 2,
    fontSize: fontSizes.medium,
  },
});

export default Settings;
