import React, { useCallback } from "react";
import {
  Card,
  Text,
  FAB,
  IconButton,
  MD3Colors,
  Dialog,
  Portal,
  Button,
  Divider,
  Avatar,
  useTheme,
  Icon,
} from "react-native-paper";
import { ScrollView, View, Image, ToastAndroid } from "react-native";
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

export default function Home({ navigation }: any) {
  const [notes, setNotes] = React.useState<any[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [noteIdToDelete, setnoteIdToDelete] = React.useState(false);
  const [state, setState] = React.useState({ open: false });
  const [markAsDone, setMarkAsDone] = React.useState(false);
  const [expenses, setExpenses] = React.useState([]);
  const [currentSavings, setCurrentSavings] = React.useState("");

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      getNotes();
    }, [])
  );

  React.useEffect(() => {
    getNotes();
    setMarkAsDone(false);
  }, [markAsDone]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toDateString();
    }
  };

  const getNotes = async () => {
    try {
      const fetchedNotes = await AsyncStorage.getItem("notes");
      if (fetchedNotes !== null) {
        let parsedNotes = JSON.parse(fetchedNotes);
        parsedNotes = parsedNotes.map((note: any) => ({
          ...note,
          createdAt: formatDate(note.createdAt),
          createdAtDate: note.createdAt,
        }));

        let expenses: any = [];
        parsedNotes.map((expense: any) => {
          if (expense.isExpense) {
            expenses.push(expense);
          }
        });

        let currentSav = "";
        const currentSavings = await AsyncStorage.getItem("currentSavings");
        const currentSavingsParsed =
          currentSavings && JSON.parse(currentSavings);
        if (currentSavings) {
          currentSav = currentSavingsParsed;
        }

        parsedNotes.sort((a: any, b: any) => {
          return (
            new Date(b.createdAtDate).getTime() -
            new Date(a.createdAtDate).getTime()
          );
        });

        const notesByDate = parsedNotes.reduce((groups: any, note: any) => {
          const date = note.createdAt;
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(note);
          return groups;
        }, {});

        setNotes(notesByDate);
        setExpenses(expenses);
        setCurrentSavings(currentSav);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote = async () => {
    try {
      let fetchedNotes: any = await AsyncStorage.getItem("notes");
      if (fetchedNotes) {
        fetchedNotes = JSON.parse(fetchedNotes);
        const filteredNotes = fetchedNotes.filter((note: any) => {
          if (note.id === noteIdToDelete) {
            if (note.isReminder) {
              Notifications.cancelScheduledNotificationAsync(
                note.notificationId
              );
            }
            return false;
          }
          return true;
        });
        await AsyncStorage.setItem("notes", JSON.stringify(filteredNotes));
        return filteredNotes;
      }
    } catch (error) {
      console.error(error);
    } finally {
      ToastAndroid.show("Note Deleted!", ToastAndroid.SHORT);
      await getNotes();
      setVisible(false);
    }
  };

  const hideDialog = () => setVisible(false);

  const onStateChange = ({ open }: any) => setState({ open });

  const { open } = state;

  const handleMarkAsDone = async (id: any) => {
    try {
      const fetchedNotes = await AsyncStorage.getItem("notes");
      if (fetchedNotes !== null) {
        let parsedNotes = JSON.parse(fetchedNotes);
        const updatedNotes = parsedNotes.map((note: any) => {
          if (note.id === id) {
            Notifications.cancelScheduledNotificationAsync(note.notificationId);
            return { ...note, isDone: true };
          }
          return note;
        });
        await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
        setMarkAsDone(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CardTitle = ({ title, noteId }: any) => {
    return (
      <Card.Title
        style={{ marginBottom: -18 }}
        titleStyle={styles.cardTitle}
        title={title}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete"
            iconColor={MD3Colors.error50}
            onPress={() => {
              setVisible(true);
              setnoteIdToDelete(noteId);
            }}
          />
        )}
      />
    );
  };

  const CardBadge = ({ icon, TextValue }: any) => {
    return (
      <View>
        <Card.Content
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            ...styles.cardBadge,
          }}
        >
          <Icon source={icon} size={18} />
          <Text>{TextValue}</Text>
        </Card.Content>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {Object.keys(notes).length === 0 && (
          <View style={styles.noNoteScreen}>
            <Image
              source={require("../../../assets/document.png")}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.noNoteScreenText}>No Notes Found</Text>
          </View>
        )}
        {Object.keys(notes).map((date: any) => (
          <React.Fragment key={date}>
            <Text variant="titleMedium" style={styles.noteDateTitle}>
              {date}
            </Text>
            {notes[date].map((note: any) => (
              <Card
                style={styles.card}
                onPress={() => {
                  if (note.isReminder) {
                    navigation.navigate("Add New Note", { id: note.id });
                  } else if (note.isExpense) {
                    navigation.navigate("Expense Tracker", { id: note.id });
                  } else {
                    navigation.navigate("Add New Note", { id: note.id });
                  }
                }}
                key={note.id}
                disabled={note.isDone}
              >
                {note.isExpense ? (
                  <>
                    <CardBadge icon={"wallet"} TextValue={"Expense"} />
                    <CardTitle
                      title={`${note.createdAt}'s Expense`}
                      noteId={note.id}
                    />
                  </>
                ) : note.isReminder ? (
                  <>
                    <CardBadge icon={"timer"} TextValue={"Reminder"} />
                    <CardTitle title={note.title} noteId={note.id} />
                  </>
                ) : (
                  note.isNote && (
                    <>
                      <CardBadge icon={"note-text"} TextValue={"Note"} />
                      <CardTitle title={note.title} noteId={note.id} />
                    </>
                  )
                )}
                <Card.Content>
                  <View>
                    <View style={styles.cardTitleAction}></View>
                    <Text>
                      {note.isExpense && (
                        <View>
                          <View>
                            {expenses &&
                              expenses.map((expense: any, index: number) => {
                                let totalExpense = 0;

                                return (
                                  <View key={index}>
                                    {expense.expenseType.map(
                                      (type: any, typeIndex: number) => {
                                        totalExpense += parseFloat(
                                          expense.expenseAmount[typeIndex]
                                        );
                                        const color =
                                          expense.isIncome &&
                                          expense.isIncome.includes(type)
                                            ? "#228b22"
                                            : "#922724";
                                        return (
                                          <View
                                            key={typeIndex}
                                            style={styles.expenseList}
                                          >
                                            <Text
                                              style={{
                                                ...styles.expenseType,
                                                color: color,
                                              }}
                                            >
                                              {type}
                                            </Text>
                                            <Text>
                                              {expense.expenseAmount[typeIndex]}
                                            </Text>
                                          </View>
                                        );
                                      }
                                    )}

                                    <Text style={styles.expenseTotal}>
                                      Total: {totalExpense}
                                    </Text>
                                  </View>
                                );
                              })}
                          </View>
                          <Text>Expected Balance: {currentSavings}</Text>
                        </View>
                      )}
                      {note.description}
                    </Text>
                    {note.isReminder && (
                      <Text style={styles.reminderDetails}>
                        Reminder Details: {"\n"}Date:{" "}
                        {note.isReminder && note.date}
                        {"\n"}
                        Time: {note.isReminder && note.time}
                      </Text>
                    )}
                    {note.isDone && <Text style={styles.doneMark}>Done</Text>}
                    <Text style={styles.cardTimeStamp}>{note.createdAt}</Text>
                  </View>
                </Card.Content>
                {note.isReminder && !note.isDone && (
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        !note.isDone && navigation.navigate("Reminder");
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onPress={() => {
                        handleMarkAsDone(note.id);
                      }}
                    >
                      Mark as Done
                    </Button>
                  </Card.Actions>
                )}
              </Card>
            ))}
            {visible && (
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>
                    Are You Sure Want to Delete This Note?
                  </Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">
                      This is an unrecoverable action
                    </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>No</Button>
                    <Button onPress={deleteNote}>Yes</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
      <FAB.Group
        open={open}
        visible
        icon={open ? "close" : "plus"}
        actions={[
          {
            icon: "wallet-plus",
            label: "Expense",
            onPress: () => navigation.navigate("Expense Tracker"),
          },
          {
            icon: "bell",
            label: "Reminder",
            onPress: () => navigation.navigate("Reminder"),
          },
          {
            icon: "plus",
            label: "New Note",
            onPress: () => navigation.navigate("Add New Note"),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
          }
        }}
      />
    </View>
  );
}
