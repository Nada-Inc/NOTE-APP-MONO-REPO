import React from "react";
import { Pressable, View } from "react-native";
import { Dialog, Icon, Portal, RadioButton, Text } from "react-native-paper";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../src/redux/slice";
import { useColorScheme } from "react-native";

export default function Settings({ navigation }: any) {
  const [isThemeSelect, setIsThemeSelect] = React.useState(false);
  const [value, setValue] = React.useState("system");

  const colorScheme: any = useColorScheme();

  const dispatch = useDispatch();

  const hideDialog = () => setIsThemeSelect(false);

  const themeSelect = (selectedRadio: any) => {
    setValue(selectedRadio);

    switch (selectedRadio) {
      case "system":
        dispatch(setTheme(colorScheme));
      case "light":
        dispatch(setTheme("light"));
        break;
      case "dark":
        dispatch(setTheme("dark"));
        break;
      default:
        dispatch(setTheme("light"));
    }
  };

  return (
    <View style={styles.container}>
      {isThemeSelect && (
        <Portal>
          <Dialog visible={isThemeSelect} onDismiss={hideDialog}>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={(newValue) => themeSelect(newValue)}
                value={value}
              >
                <Pressable
                  style={styles.radioTheme}
                  onPress={() => themeSelect("system")}
                >
                  <RadioButton value="system" />
                  <Text>System Theme (Default)</Text>
                </Pressable>
                <Pressable
                  style={styles.radioTheme}
                  onPress={() => themeSelect("light")}
                >
                  <RadioButton value="light" />
                  <Text>Light</Text>
                </Pressable>
                <Pressable
                  style={styles.radioTheme}
                  onPress={() => themeSelect("dark")}
                >
                  <RadioButton value="dark" />
                  <Text>Dark</Text>
                </Pressable>
              </RadioButton.Group>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
      <Text style={styles.settingsTitle}>Account</Text>
      <Pressable style={styles.settingSingleItem}>
        <Icon source="email" size={20} />
        <Text>Email</Text>
      </Pressable>
      <Pressable
        style={styles.settingSingleItem}
        onPress={() => {
          navigation.navigate("Data Control");
        }}
      >
        <Icon source="tune-variant" size={20} />
        <Text>Data Control</Text>
      </Pressable>

      <Text style={{ ...styles.settingsTitle, marginTop: 20 }}>App</Text>
      <Pressable
        style={styles.settingSingleItem}
        onPress={() => setIsThemeSelect(true)}
      >
        <Icon source="brightness-6" size={20} />
        <View>
          <Text>Color Theme</Text>
          <Text variant="labelSmall">
            {value.charAt(0).toUpperCase() + value.slice(1)}
            {value === "system" ? "(Default)" : null}
          </Text>
        </View>
      </Pressable>

      <Text style={{ ...styles.settingsTitle, marginTop: 20 }}>About</Text>
      <Pressable style={styles.settingSingleItem}>
        <Icon source="help" size={20} />
        <Text>Help Center</Text>
      </Pressable>
      <Pressable style={styles.settingSingleItem}>
        <Icon source="book" size={20} />
        <Text>Terms of use</Text>
      </Pressable>
      <Pressable
        style={styles.settingSingleItem}
        onPress={() => {
          navigation.navigate("Privacy Policy");
        }}
      >
        <Icon source="security" size={20} />
        <Text>Privacy policy</Text>
      </Pressable>
      <Pressable style={styles.settingSingleItem}>
        <Icon source="circle-outline" size={20} />
        <View>
          <Text>Note App For Android</Text>
          <Text variant="labelSmall">Version 1.0.1</Text>
        </View>
      </Pressable>
    </View>
  );
}
