import "react-native-get-random-values";
import React from "react";
import { View, ToastAndroid, Keyboard } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slice";

export default function LoginForm() {
  const [userId, setuserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emptyFieldWarning, setEmptyFieldWarning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigation: any = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (userId === "" || password === "") {
      setEmptyFieldWarning(true);
      return;
    }

    try {
      const userCheck: any = await AsyncStorage.getItem("user");
      let user = userCheck ? JSON.parse(userCheck) : null;

      if (user === null) {
        user = {
          userId: userId,
          password: password,
        };
        try {
          setLoading(true);
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/notes/loginNoteUser`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );

          if (response.status === 200) {
            const data = await response.json();
            const token = data.token;
            const userName = data.userName;
            const userId = data.userId;

            const userData: any = {
              token: token,
              userName: userName,
              userId: userId,
            };
            await AsyncStorage.setItem("user", JSON.stringify(userData));
            await dispatch(setUserData(userData));
            await navigation.navigate("Home");
            ToastAndroid.show("Logged In Successfully", ToastAndroid.SHORT);
          } else {
            if (response.status === 401) {
              ToastAndroid.show("Invalid Password", ToastAndroid.SHORT);
            } else if (response.status === 400) {
              ToastAndroid.show(
                "User not found Check Your UserId",
                ToastAndroid.SHORT
              );
            } else if (response.status === 404) {
              ToastAndroid.show("Not Exists On Our DB", ToastAndroid.SHORT);
            }
          }
        } catch (error) {
          ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
        } finally {
          setLoading(false);
        }
      } else {
        ToastAndroid.show("Already Signed In", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideDialog = () => setEmptyFieldWarning(false);

  return (
    <View>
      {emptyFieldWarning && (
        <Portal>
          <Dialog visible={emptyFieldWarning} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Either userId or Password is Missing
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      <Text style={styles.loginTopText}>Login To Your Account</Text>
      <TextInput
        label="user name"
        mode="outlined"
        value={userId}
        onChangeText={setuserId}
      />
      <TextInput
        label="password"
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        value={password}
        onChangeText={setPassword}
      />
      <Button
        mode="contained-tonal"
        style={{ borderRadius: 10, ...styles.loginBtn }}
        onPress={handleLogin}
      >
        Login
      </Button>
      {loading && (
        <Portal>
          <Dialog visible={loading} dismissable={false}>
            <Dialog.Content style={styles.loginDialog}>
              <ActivityIndicator animating={true} />
              <Text variant="bodyMedium">Logging You In, Please Wait!</Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </View>
  );
}
