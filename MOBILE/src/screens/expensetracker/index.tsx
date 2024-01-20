import React from "react";
import { View, Keyboard, ToastAndroid, Pressable } from "react-native";
import {
  Text,
  Button,
  Dialog,
  Portal,
  TextInput,
  Surface,
  SegmentedButtons,
  ActivityIndicator,
} from "react-native-paper";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import TrackExpense from "./TrackExpense";
import TrackIncome from "./TrackIncome";
import Expenseoverview from "./expenseoverview";

export default function ExpenseTracker({ navigation, route }: any) {
  const { id } = route.params || { id: undefined };

  const [visible, setVisible] = React.useState(true);
  const [savings, setSavings] = React.useState("");
  const [savingsDisplay, setSavingsDisplay] = React.useState("");
  const [isFirstTimeTrack, setIsFirstTimeTrack] = React.useState(true);
  const [value, setValue] = React.useState("expense");
  const [isLoading, setIsloading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getSavings();
    }, [])
  );

  const getSavings = async () => {
    setIsloading(true);
    try {
      const savings = await AsyncStorage.getItem("currentSavings");
      if (savings != null) {
        const parsedSavings = JSON.parse(savings);
        setSavingsDisplay(parsedSavings);
        setIsFirstTimeTrack(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleCurrentSavings = async () => {
    Keyboard.dismiss();
    try {
      if (savings === "") {
        ToastAndroid.show("Field Can't be Empty", ToastAndroid.SHORT);
        return;
      }
      await AsyncStorage.setItem("currentSavings", savings);
      setVisible(false);
      setIsFirstTimeTrack(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
      getSavings();
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isDelete && (
          <Portal>
            <Dialog visible={isDelete}>
              <Dialog.Title>Delete Current Savings</Dialog.Title>
              <Dialog.Content>
                <Text>Are You Sure want to delete your Current Savings</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setIsDelete(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onPress={async () => {
                    await AsyncStorage.removeItem("currentSavings");
                    setIsDelete(false);
                    navigation.navigate("Home");
                  }}
                >
                  yes
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
        {isFirstTimeTrack && !isLoading ? (
          <Portal>
            <Dialog
              visible={visible}
              dismissableBackButton={false}
              dismissable={false}
            >
              <Dialog.Title>Add Your Current Savings</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Eg: 10000 INR"
                  mode="outlined"
                  value={savings}
                  onChangeText={setSavings}
                  inputMode="numeric"
                />
                <Text style={styles.expenseAmountNote}>
                  * Your Expense amount will be substract from this amount.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setVisible(false);
                    isEditing
                      ? setIsFirstTimeTrack(false)
                      : navigation.navigate("Home");
                  }}
                >
                  Cancel
                </Button>
                <Button onPress={handleCurrentSavings}>
                  {isEditing ? "Update" : "Save"}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        ) : (
          <React.Fragment>
            <Surface mode="flat" style={styles.expenseSurface}>
              <View style={styles.content}>
                <View style={styles.expenseTitle}>
                  <Text>Your Current Savings: </Text>
                  <Text variant="titleLarge">
                    {savingsDisplay && savingsDisplay} INR
                  </Text>
                </View>
                <View style={styles.editBtn}>
                  <Button
                    mode="elevated"
                    onPress={() => {
                      setIsFirstTimeTrack(true);
                      setVisible(true);
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() => {
                      setIsDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </View>
              </View>
              <Image
                source={require("../../../assets/money-bag.png")}
                style={styles.image}
              />
            </Surface>
            <SegmentedButtons
              style={styles.segmentedLogin}
              value={value}
              onValueChange={setValue}
              buttons={[
                {
                  value: "expense",
                  label: "Track Expense",
                  icon: "login",
                },
                { value: "income", label: "Track Income", icon: "account" },
              ]}
            />
            {value === "expense" ? (
              <TrackExpense id={id} />
            ) : (
              <TrackIncome id={id} />
            )}
            {/* <Expenseoverview /> */}
          </React.Fragment>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
