import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { Home, Search } from "./screens";
import React, { useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeIcon from "./assets/home.svg";
import SearchIcon from "./assets/search.svg";
import AccountIcon from "./assets/account.svg";
import WatchlistIcon from "./assets/watchlist.svg";
import theme from "./theme";

const { colors } = theme;

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              fill={focused ? colors.black : colors.lightGrey}
              width={28}
              height={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <SearchIcon
              fill={focused ? colors.black : colors.lightGrey}
              width={28}
              height={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <WatchlistIcon
              fill={focused ? colors.black : colors.lightGrey}
              width={28}
              height={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <AccountIcon
              fill={focused ? colors.black : colors.lightGrey}
              width={28}
              height={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const ref = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>{BottomNavigation()}</NavigationContainer>
    </SafeAreaView>
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
