import React from "react";
import { View, Keyboard, ToastAndroid } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  HelperText,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "./style";

export default function SignupForm() {
  const [userId, setuserId] = React.useState("");
  const [userName, setuserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [emptyFieldWarning, setEmptyFieldWarning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (userId === "" || password === "" || userName === "") {
      setEmptyFieldWarning(true);
      return;
    }

    if (hasError && passwordConfirmError) {
      setEmptyFieldWarning(true);
      return;
    }

    const user = {
      userName: userName,
      userId: userId,
      password: password,
      email: "",
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/notes/createNoteUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.status === 200) {
        setuserName("");
        setuserId("");
        setPassword("");
        setPasswordConfirm("");

        ToastAndroid.show(
          "Signed Up Successfully, Login to Continue",
          ToastAndroid.SHORT
        );
      } else {
        if (response.status === 401) {
          ToastAndroid.show(
            "User Id already exists, Please Try Something else",
            ToastAndroid.SHORT
          );
        } else if (response.status === 400) {
          ToastAndroid.show(
            "Oops! Something went wrong in our Side. Please Try After Sometimes",
            ToastAndroid.SHORT
          );
        }
      }
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const handleUserId = (userId: any) => {
    const userIdLowerCase = userId.toLowerCase();
    setuserId(userIdLowerCase);

    const alphanumeric = /^[a-z0-9]+$/i;

    if (!alphanumeric.test(userId) || userId.includes(" ")) {
      setHasError(true);
      return true;
    }

    setHasError(false);
    return false;
  };

  const handlePasswordConfirmChange = (passwordConfirm: any) => {
    setPasswordConfirm(passwordConfirm);
    if (password !== passwordConfirm) {
      setPasswordConfirmError(true);
    } else {
      setPasswordConfirmError(false);
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
                All Mandatory Fields Should be Filled
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      <Text style={styles.loginTopText}>Create a New Account</Text>
      <TextInput
        label="Enter Your Name*"
        mode="outlined"
        value={userName}
        onChangeText={setuserName}
      />
      <TextInput
        label="Enter a user id*"
        mode="outlined"
        value={userId}
        onChangeText={handleUserId}
      />
      {hasError && (
        <HelperText type="error">
          userId should not contain space and special characters
        </HelperText>
      )}
      <TextInput
        label="Enter a Password*"
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        label="Confirm Password*"
        mode="outlined"
        secureTextEntry
        value={passwordConfirm}
        onChangeText={handlePasswordConfirmChange}
        right={<TextInput.Icon icon="eye" />}
      />
      {passwordConfirmError && (
        <HelperText type="error">Password Must Match</HelperText>
      )}
      <Button
        mode="contained-tonal"
        style={{ borderRadius: 10, ...styles.loginBtn }}
        onPress={handleSignUp}
      >
        Sign Up
      </Button>
      <Text style={styles.privacyPolicy}>
        By Signing Up You're agreeing to our Privacy Policy. For More
        Information Visit Here
      </Text>
      {loading && (
        <Portal>
          <Dialog visible={loading} dismissable={false}>
            <Dialog.Content style={styles.loginDialog}>
              <ActivityIndicator animating={true} />
              <Text variant="bodyMedium">Signing You Up, Please Wait!</Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </View>
  );
}
