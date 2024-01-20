import React from "react";
import { Platform, View, ToastAndroid, Keyboard } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { styles } from "./style";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Reminder({ navigation }: any) {
  const [notification, setNotification] = React.useState<any>(false);

  const [date, setDate] = React.useState<any>(new Date());
  const [time, setTime] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [formattedTime, setFormattedTime] = React.useState<any>();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  const [emptyFieldWarning, setEmptyFieldWarning] = React.useState(false);

  // Notification Register on Load
  React.useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  React.useEffect(() => {
    if (time) {
      const date = new Date();
      date.setHours(time.hours);
      date.setMinutes(time.minutes);
      const timeString = date.toTimeString();
      const trimmedTime = timeString.split(" GMT")[0];
      setFormattedTime(trimmedTime);
    }
  }, [time]);

  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    (params: any) => {
      setVisible(false);
      setTime(params);
    },
    [setVisible]
  );

  const today: any = new Date().toDateString();
  const now: any = new Date().toTimeString();
  const trimmedTime = now.split(" GMT")[0];

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  async function schedulePushNotification(
    date: any,
    time: any,
    title: any,
    description: any
  ) {
    Keyboard.dismiss();
    if (title === "" || description === "") {
      setEmptyFieldWarning(true);
      return;
    }
    try {
      const existingNotes = await AsyncStorage.getItem("notes");
      const allNotes = existingNotes ? JSON.parse(existingNotes) : [];

      const trigger = new Date(date);
      trigger.setHours(time.hours);
      trigger.setMinutes(time.minutes);
      trigger.setSeconds(0);

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: description,
          data: { screen: "Home" },
        },
        trigger: trigger,
      });

      await allNotes.push({
        id: uuidv4(),
        title,
        description,
        date: date,
        time: trimmedTime,
        isReminder: true,
        createdAt: new Date().toISOString(),
        notificationId: notificationId,
      });
      await AsyncStorage.setItem("notes", JSON.stringify(allNotes));

      // return notificationId;
    } catch (error) {
      console.log(error);
    } finally {
      // await saveReminder();
      ToastAndroid.show("Reminder Added", ToastAndroid.SHORT);
      navigation.navigate("Home");
    }
  }

  const hideDialog = () => setEmptyFieldWarning(false);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dateTimePicker}>
          {emptyFieldWarning && (
            <Portal>
              <Dialog visible={emptyFieldWarning} onDismiss={hideDialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    Either Title or Description is Missing
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Ok</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          )}
          <Button
            onPress={() => setOpen(true)}
            uppercase={false}
            mode="outlined"
            icon={"calendar"}
          >
            {date != undefined ? date.toDateString() : today}
          </Button>
          <Button
            onPress={() => setVisible(true)}
            uppercase={false}
            mode="outlined"
            icon={"clock-edit"}
          >
            {formattedTime != undefined ? formattedTime : trimmedTime}
          </Button>
        </View>
        <View style={styles.reminderTextField}>
          <TextInput
            label="Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            label="Description"
            mode="outlined"
            multiline={true}
            numberOfLines={8}
            value={description}
            onChangeText={setDescription}
          />
          <Button
            mode="contained-tonal"
            style={{ borderRadius: 10, marginTop: 10 }}
            onPress={async () => {
              await schedulePushNotification(date, time, title, description);
            }}
          >
            Add Reminder
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={12}
        minutes={0}
      />
    </View>
  );
}

// Push Notification register
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      ToastAndroid.show(
        "Failed to get push token for push notification!",
        ToastAndroid.SHORT
      );
      return;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
