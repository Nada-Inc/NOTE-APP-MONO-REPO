import React from "react";
import { Appbar, Searchbar, Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { styles } from "./style";

export default function AppBar({ navigation, drawer }: any) {
  const canGoBack = navigation.canGoBack();
  const route = useRoute();

  const [isSearch, setIsSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Appbar.Header mode={route.name === "Home" ? "center-aligned" : "small"}>
      {canGoBack ? (
        <Appbar.BackAction
          onPress={() => {
            if (route.name === "Login") {
              navigation.navigate("Home");
            } else {
              navigation.goBack();
            }
          }}
        />
      ) : (
        !isSearch && (
          <Appbar.Action
            icon="menu"
            onPress={() => drawer.current?.openDrawer()}
          />
        )
      )}
      {isSearch ? (
        <View style={styles.appBarContainer}>
          <Searchbar
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1 }}
          />
          <Pressable onPress={() => setIsSearch(false)}>
            <Text>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <Appbar.Content title={canGoBack ? route.name : "Note App"} />
      )}

      {route.name === "Home" && !isSearch && (
        <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
      )}
    </Appbar.Header>
  );
}
