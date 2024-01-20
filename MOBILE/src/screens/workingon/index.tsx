import React from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "./style";
// import LottieView from "lottie-react-native";

export default function WorkingOn() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/working-hours.png")}
        style={{ width: 100, height: 100 }}
      />
      {/* <LottieView
        autoPlay
        loop
        style={{
          width: "80%",
          // aspectRatio: 1,
        }}
        source={require("../../../assets/lottie/worker.json")}
      /> */}
      <Text style={{ ...styles.text, color: "#737373" }}>
        Hold On!! {"\n"}We're Working on This Feature
      </Text>
    </View>
  );
}
