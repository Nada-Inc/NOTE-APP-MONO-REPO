import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import { styles } from "./style";
import { ScrollView } from "react-native-gesture-handler";

export default function Expenseoverview() {
  return (
    <View style={styles.expenseOverView}>
      <View style={styles.overViewHead}>
        <Text variant="titleMedium">OverView</Text>
        <Button>History</Button>
      </View>
      <Divider />
      <ScrollView
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
      >
        <Surface style={styles.overViewSurface} mode="flat">
          <View style={styles.overViewTitle}>
            <Text variant="titleSmall">Yesterday</Text>
            <Text variant="titleSmall">Total</Text>
          </View>
          <View style={{ ...styles.overViewTitle, marginTop: 15 }}>
            <View>
              <Text>Food</Text>
              <Text>Travel</Text>
              <Text>Entertainment</Text>
              <Text>Other</Text>
              <Pressable>
                <Text style={styles.overViewShowMore}>Show More...</Text>
              </Pressable>
            </View>
            <View>
              <Text>200</Text>
              <Text>450</Text>
              <Text>365</Text>
              <Text>789</Text>
            </View>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
}
