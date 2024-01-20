import "react-native-gesture-handler";
import React from "react";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { RootState, store } from "./src/redux/store";
import { Provider } from "react-redux";
import DrawerLayout from "./src/components/drawerlayout";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setUserData } from "./src/redux/slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { registerTranslation, en } from "react-native-paper-dates";
import * as Notifications from "expo-notifications";
import { navigationRef, navigate } from "./RootNavigation";

enableScreens(false);

// React-native-paper-datetimepicker config
registerTranslation("en", en);

SplashScreen.preventAutoHideAsync();

const ReduxWrapper = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  const colorScheme: any = useColorScheme();
  const { theme } = useMaterial3Theme();

  const dispatch = useDispatch();
  const globalTheme = useSelector((state: RootState) => state.theme.value);

  const loadTheme = async () => {
    const storedTheme = await AsyncStorage.getItem("theme");
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    } else {
      dispatch(setTheme(colorScheme));
    }
  };

  const getUser = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        await dispatch(setUserData(user));
      } else {
        await dispatch(setUserData(null));
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    loadTheme();
    getUser();
  }, []);

  React.useEffect(() => {
    try {
      AsyncStorage.setItem("theme", globalTheme);
    } catch (error) {
      console.error(error);
    } finally {
      setAppIsReady(true);
    }
  }, [globalTheme]);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const paperTheme: any =
    globalTheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.light };
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={paperTheme} ref={navigationRef}>
          <DrawerLayout onLayout={onLayoutRootView} />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default function App() {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  React.useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.notification.request.content.data["key"] &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      navigate(
        lastNotificationResponse.notification.request.content.data.screen
      );
    }
  }, [lastNotificationResponse]);

  return (
    <Provider store={store}>
      <ReduxWrapper />
    </Provider>
  );
}
