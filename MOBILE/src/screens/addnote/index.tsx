import "react-native-get-random-values";
import React from "react";
import { View, ToastAndroid, Keyboard } from "react-native";
import {
  Text,
  TextInput,
  Button,
  Dialog,
  Portal,
  ToggleButton,
} from "react-native-paper";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "react-native-paper";

export default function AddNewNote({ navigation, route }: any) {
  const { id } = route.params || { id: undefined };

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [emptyFieldWarning, setEmptyFieldWarning] = React.useState(false);
  const [value, setValue] = React.useState("");

  const theme: any = useTheme();

  React.useEffect(() => {
    singleNoteFetch();
  }, [id]);

  const singleNoteFetch = async () => {
    try {
      const storedData = await AsyncStorage.getItem("notes");
      if (storedData !== null) {
        const allNotes = JSON.parse(storedData);
        const note = allNotes.find((note: any) => note.id === id);

        if (note) {
          setTitle(note.title);
          setDescription(note.description);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveNote = async () => {
    Keyboard.dismiss();
    const isUpadte: boolean = id != undefined ? true : false;
    if (title === "" || description === "") {
      setEmptyFieldWarning(true);
      return;
    }
    try {
      if (isUpadte) {
        const existingNotes = await AsyncStorage.getItem("notes");
        const allNotes = existingNotes ? JSON.parse(existingNotes) : [];

        const updatedNote = allNotes.map((note: any) => {
          if (note.id === id) {
            return { ...note, title: title, description: description };
          }
          return note;
        });

        await AsyncStorage.setItem("notes", JSON.stringify(updatedNote));
      } else {
        const existingNotes = await AsyncStorage.getItem("notes");
        const allNotes = existingNotes ? JSON.parse(existingNotes) : [];

        allNotes.push({
          id: uuidv4(),
          title,
          description,
          isNote: true,
          createdAt: new Date().toISOString(),
        });
        await AsyncStorage.setItem("notes", JSON.stringify(allNotes));
      }
    } catch (error) {
      console.log(error);
    } finally {
      ToastAndroid.show(
        isUpadte ? "Updated Note" : "New Note Added!",
        ToastAndroid.SHORT
      );
      navigation.navigate("Home");
    }
  };

  const hideDialog = () => setEmptyFieldWarning(false);

  return (
    <React.Fragment>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
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

          <ToggleButton.Row
            onValueChange={(value) => setValue(value)}
            value={value}
          >
            <ToggleButton icon="format-bold" value="bold" />
            <ToggleButton icon="format-underline" value="underline" />
            <ToggleButton icon="format-list-bulleted" value="bulleted" />
            <ToggleButton icon="format-list-numbered" value="numbered" />
            <ToggleButton icon="format-align-left" value="right" />
            <ToggleButton icon="format-align-right" value="right" />
          </ToggleButton.Row>

          <TextInput
            placeholder="Title"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={{ fontWeight: "bold" }}
            outlineStyle={{ borderColor: theme.colors.background }}
          />
          <TextInput
            placeholder="Description"
            mode="outlined"
            multiline={true}
            numberOfLines={15}
            value={description}
            onChangeText={setDescription}
            outlineStyle={{ borderColor: theme.colors.background }}
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        mode="contained-tonal"
        style={{ ...styles.button, borderRadius: 10 }}
        onPress={saveNote}
      >
        {id != undefined ? "Update Note" : "Add New Note"}
      </Button>
    </React.Fragment>
  );
}
