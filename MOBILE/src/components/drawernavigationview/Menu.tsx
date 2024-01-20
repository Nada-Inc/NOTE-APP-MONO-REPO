import React from "react";
import { Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./style";
import { Drawer, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface MenuProps {
  iconName: string;
  menuTitle: string;
  drawer: any;
  route: string;
}

export default function Menu({
  iconName,
  menuTitle,
  drawer,
  route,
}: MenuProps) {
  const navigation: any = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate(route);
        drawer.current?.closeDrawer();
      }}
    >
      <View style={styles.menu}>
        <Icon name={iconName} size={24} color={"#6b6b6b"} />
        <Text style={styles.menuTitle}>{menuTitle}</Text>
      </View>
    </Pressable>
  );
}
