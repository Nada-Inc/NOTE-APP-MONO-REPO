import React from "react";
import { View } from "react-native";
import { Icon, Switch, Text, MD3Colors } from "react-native-paper";
import { styles } from "../style";

export default function DataControl() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Analytics</Text>
      <View style={styles.analyticsBtn}>
        <Text>Send Analytics</Text>
        <Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </Text>
      </View>
      <View style={styles.deleteBtn}>
        <Icon source="delete" size={20} color={MD3Colors.error50} />
        <Text style={{ color: MD3Colors.error50 }}>Delete All Note Data</Text>
      </View>
      <Text style={{ fontWeight: "bold" }}>Account</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <Icon source="download" size={20} />
        <Text>Export Data</Text>
      </View>
      <View style={styles.deleteBtn}>
        <Icon source="delete" size={20} color={MD3Colors.error50} />
        <Text style={{ color: MD3Colors.error50 }}>Delete Account</Text>
      </View>
    </View>
  );
}
