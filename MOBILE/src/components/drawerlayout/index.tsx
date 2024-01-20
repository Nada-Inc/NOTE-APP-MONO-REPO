import React from "react";
import { DrawerLayoutAndroid } from "react-native";
import SafeAreaDrawer from "../../global/safeareaviewdrawer";
import DrawerComponent from "../drawernavigationview/DrawerComponent";
import { Main } from "../../routes";
import { StatusBar } from "expo-status-bar";
import { MD3DarkTheme, MD3LightTheme, Drawer } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function DrawerLayout({ onLayout }: any) {
  const drawer = React.useRef<DrawerLayoutAndroid>(null);
  const [drawerPosition, setDrawerPosition] = React.useState<"left" | "right">(
    "left"
  );

  const navigationView = () => (
    <SafeAreaDrawer>
      <DrawerComponent drawer={drawer} />
    </SafeAreaDrawer>
  );

  const globalTheme = useSelector((state: RootState) => state.theme.value);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
      drawerBackgroundColor={
        globalTheme === "dark"
          ? MD3DarkTheme.colors.background
          : MD3LightTheme.colors.background
      }
      onLayout={onLayout}
    >
      <StatusBar style="auto" />
      <Main drawer={drawer} />
    </DrawerLayoutAndroid>
  );
}
