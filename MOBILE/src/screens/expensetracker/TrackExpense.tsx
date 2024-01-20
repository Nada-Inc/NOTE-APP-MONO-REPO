import "react-native-get-random-values";
import React from "react";
import { Image, Keyboard, ToastAndroid, View } from "react-native";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import { styles } from "./style";
import { DatePickerModal } from "react-native-paper-dates";
import DropDown from "../../components/dropdown";
import { expenseList } from "../../data/expenselist";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function TrackExpense({ id }: any) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<any>(new Date());
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [expenseType, setExpenseType] = React.useState<any>();
  const [expenseAmount, setExpenseAmount] = React.useState<number | any>();
  const [emptyFieldWarning, setEmptyFieldWarning] = React.useState(false);

  const today: any = new Date().toDateString();
  const navigation: any = useNavigation();

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const addExpense = async () => {
    Keyboard.dismiss();
    if (!expenseType || !expenseAmount) {
      setEmptyFieldWarning(true);
      return;
    }
    try {
      const currentSavings = await AsyncStorage.getItem("currentSavings");
      const currentSavingsParsed =
        currentSavings && (await JSON.parse(currentSavings));
      const newCurrent = parseFloat(currentSavingsParsed) - expenseAmount;
      if (newCurrent < 0) {
        ToastAndroid.show("Amount Can't Be Negative Value", ToastAndroid.SHORT);
      } else {
        await AsyncStorage.setItem("currentSavings", newCurrent.toString());

        try {
          const existingNotes = await AsyncStorage.getItem("notes");
          const allExpense = existingNotes ? JSON.parse(existingNotes) : [];

          let isUpdate = false;

          for (let i = 0; i < allExpense.length; i++) {
            if (allExpense[i].isExpense && allExpense[i].id === id) {
              let index = allExpense[i].expenseType.indexOf(expenseType);
              if (index !== -1) {
                // If expenseType exists, update the corresponding expenseAmount
                allExpense[i].expenseAmount[index] = expenseAmount;
              } else {
                // If expenseType does not exist, add a new entry
                allExpense[i].expenseType.push(expenseType);
                allExpense[i].expenseAmount.push(expenseAmount);
              }
              isUpdate = true;
              break;
            }
          }

          if (!isUpdate) {
            allExpense.push({
              id: uuidv4(),
              isExpense: true,
              expenseType: [expenseType],
              expenseAmount: [expenseAmount],
              createdAt: date,
            });
          }

          await AsyncStorage.setItem("notes", JSON.stringify(allExpense));
        } catch (error) {
          console.error(error);
        } finally {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hideDialog = () => setEmptyFieldWarning(false);

  return (
    <React.Fragment>
      {emptyFieldWarning && (
        <Portal>
          <Dialog visible={emptyFieldWarning} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Either Expense Type or Amount is Missing
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
      <View style={styles.expenseForm}>
        <Button
          onPress={() => setOpen(true)}
          uppercase={false}
          mode="outlined"
          icon={"calendar"}
          style={{ borderRadius: 5 }}
        >
          {date != undefined ? date.toDateString() : today}
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
        <View style={{ marginTop: 4 }}>
          <DropDown
            label="Expense Type"
            mode="outlined"
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={expenseType}
            setValue={setExpenseType}
            list={expenseList}
          />
          <TextInput
            label="Amount"
            mode="outlined"
            inputMode="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
          />
          <Button
            mode="contained-tonal"
            style={{ borderRadius: 10, marginTop: 10 }}
            onPress={addExpense}
          >
            Add Expense
          </Button>
        </View>
      </View>
    </React.Fragment>
  );
}
