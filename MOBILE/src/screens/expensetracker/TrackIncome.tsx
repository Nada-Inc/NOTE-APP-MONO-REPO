import "react-native-get-random-values";
import React from "react";
import { Image, Keyboard, ToastAndroid, View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "./style";
import { DatePickerModal } from "react-native-paper-dates";
import DropDown from "../../components/dropdown";
import { incomeList } from "../../data/incomeList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";

export default function TrackExpense({ id }: any) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<any>(new Date());
  const [showDropDown, setShowDropDown] = React.useState(false);
  const [incomeType, setIncomeType] = React.useState<any>();
  const [incomeAmount, setIncomeAmount] = React.useState<number | any>();
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

  const addIncome = async () => {
    Keyboard.dismiss();
    if (!incomeType || !incomeAmount) {
      setEmptyFieldWarning(true);
      return;
    }
    try {
      const currentSavings = await AsyncStorage.getItem("currentSavings");
      const currentSavingsParsed =
        currentSavings && (await JSON.parse(currentSavings));
      const newCurrent =
        parseFloat(currentSavingsParsed) + parseFloat(incomeAmount);

      await AsyncStorage.setItem("currentSavings", newCurrent.toString());

      try {
        const existingNotes = await AsyncStorage.getItem("notes");
        const allExpense = existingNotes ? JSON.parse(existingNotes) : [];

        let isUpdate = false;

        for (let i = 0; i < allExpense.length; i++) {
          if (allExpense[i].isExpense && allExpense[i].id === id) {
            let index = allExpense[i].expenseType.indexOf(incomeType);
            if (index !== -1) {
              // If expenseType exists, update the corresponding expenseAmount
              allExpense[i].expenseAmount[index] = incomeAmount;
            } else {
              // If expenseType does not exist, add a new entry
              allExpense[i].expenseType.push(incomeType);
              allExpense[i].isIncome && allExpense[i].isIncome.push(incomeType);
              allExpense[i].expenseAmount.push(incomeAmount);
            }
            isUpdate = true;
            break;
          }
        }

        if (!isUpdate) {
          allExpense.push({
            id: uuidv4(),
            isExpense: true,
            isIncome: [incomeType],
            expenseType: [incomeType],
            expenseAmount: [incomeAmount],
            createdAt: date,
          });
        }

        await AsyncStorage.setItem("notes", JSON.stringify(allExpense));
      } catch (error) {
        console.error(error);
      } finally {
        ToastAndroid.show("Income Added Successfully", ToastAndroid.SHORT);
        navigation.navigate("Home");
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
                Either Income Type or Amount is Missing
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
            label="Income Type"
            mode="outlined"
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={incomeType}
            setValue={setIncomeType}
            list={incomeList}
          />
          <TextInput
            label="Amount"
            mode="outlined"
            inputMode="numeric"
            value={incomeAmount}
            onChangeText={setIncomeAmount}
          />
          <Button
            mode="contained-tonal"
            style={{ borderRadius: 10, marginTop: 10 }}
            onPress={addIncome}
          >
            Add Income
          </Button>
        </View>
      </View>
    </React.Fragment>
  );
}
