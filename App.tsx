import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Alert,
  LogBox,
} from "react-native";
import {
  CoinDetails,
  Home,
  Login,
  Settings,
  Search,
  Watchlist,
} from "./screens";
import React, { useEffect, useReducer, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeIcon from "./assets/icons/home.svg";
import SearchIcon from "./assets/icons/search.svg";
import SettingsIcon from "./assets/icons/settings.svg";
import WatchlistIcon from "./assets/icons/watchlist.svg";
import NewsIcon from "./assets/icons/news.svg";
import theme from "./theme";
import { createStackNavigator } from "@react-navigation/stack";
import { initializeApp } from "firebase/app";
import { AuthContext } from "./contexts/UserContext";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import News from "./screens/News";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);

const { colors } = theme;
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const WatchlistStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Watchlist"
        component={Watchlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [requireLogin, setRequireLogin] = useState(true);

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
          name="HomeStack"
          component={HomeStack}
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
          name="SearchStack"
          component={SearchStack}
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
          name="News"
          component={News}
          options={{
            tabBarIcon: ({ focused }) => (
              <NewsIcon
                fill={focused ? colors.black : colors.lightGrey}
                width={28}
                height={28}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WatchlistStack"
          component={WatchlistStack}
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
          name="Settings"
          children={() => <Settings user={loginState.user} />}
          options={{
            tabBarIcon: ({ focused }) => (
              <SettingsIcon
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

  const initialLoginState = {
    isLoading: true,
    user: null,
  };

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCLmP8Cf6DUCg9yxTtBOTqA3U4YbzI4U8w",
      authDomain: "coinfacts-c4a69.firebaseapp.com",
      projectId: "coinfacts-c4a69",
      storageBucket: "coinfacts-c4a69.appspot.com",
      messagingSenderId: "517304267657",
      appId: "1:517304267657:web:ae0b016c15b29bca64a758",
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);

    // Adding listener for firebase auth
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "LOGIN", user: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return unsubscribe;
  }, []);

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          user: action.user,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          user: action.user,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        return signInWithEmailAndPassword(getAuth(), email, password)
          .then(async (userCred) => {
            dispatch({ type: "LOGIN", user: userCred.user });
            return true;
          })
          .catch((error) => {
            if (error.code === "auth/user-disabled") {
              alert("User disabled!");
            }
            if (error.code === "auth/invalid-email") {
              alert("That email address is invalid!");
            }
            if (error.code === "auth/user-not-found") {
              Alert.alert(
                "User Not Found",
                "The email address you entered is not linked to an account. Please Register for a new account."
              );
            }
            if (error.code === "auth/wrong-password") {
              Alert.alert(
                "Wrong Password",
                "Please re-enter your password and try again."
              );
            }

            return false;
          });
      },
      signOut: async () => {
        return signOut(getAuth()).then(async () => {
          dispatch({ type: "LOGOUT" });
        });
      },
      signUp: (email, password) => {
        return createUserWithEmailAndPassword(getAuth(), email, password)
          .then((userCred) => {
            dispatch({ type: "REGISTER", user: userCred.user });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              alert("That email address is already in use!");
            }
            if (error.code === "auth/invalid-email") {
              alert("That email address is invalid!");
            }
            if (error.code === "auth/operation-not-allowed") {
              alert("Operation is not allowed!");
            }
            if (error.code === "auth/weak-password") {
              alert("The password is too weak!");
            }
            return false;
          });
      },
      continueWithoutLogging: () => {
        setRequireLogin(false);
      },
      returnToLogin: () => {
        setRequireLogin(true);
      },
    }),
    []
  );

  const RootStack = () => {
    return (
      <Stack.Navigator>
        {loginState.user !== null || !requireLogin ? (
          <Stack.Screen
            name="MainApp"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    );
  };

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>{RootStack()}</NavigationContainer>
      </SafeAreaView>
    </AuthContext.Provider>
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
