import React from "react";
import { View, Image } from "react-native";
import { Text, SegmentedButtons, Surface } from "react-native-paper";
import { styles } from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUp";

export default function Login({ navigation }: any) {
  const [value, setValue] = React.useState("login");

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.welcomeLogo}>
          <Image
            source={require("../../../assets/message.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text variant="titleLarge">Sync Your Data With Cloud</Text>
          <SegmentedButtons
            style={styles.segmentedLogin}
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "login",
                label: "Login",
                icon: "login",
              },
              { value: "signup", label: "Sign Up", icon: "account" },
            ]}
          />
          <Surface mode="flat" style={styles.surfaceStyle}>
            {value === "login" ? <LoginForm /> : <SignupForm />}
          </Surface>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
