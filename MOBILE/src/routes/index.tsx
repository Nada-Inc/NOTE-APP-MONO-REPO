import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home";
import Settings from "../screens/settings";
import AppBar from "../components/appbar";
import AddNewNote from "../screens/addnote";
import Credits from "../screens/credits";
import Account from "../screens/account";
import WorkingOn from "../screens/workingon";
import Login from "../screens/login";
import Reminder from "../screens/reminder";
import ExpenseTracker from "../screens/expensetracker";
import DataControl from "../screens/settings-subscreens/datacontrol";
import Privacy from "../screens/settings-subscreens/privacypolicy";
import AccountEdit from "../screens/account/accountedit";

const Stack = createStackNavigator();

export const Main = ({ drawer }: any) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        header: ({ scene, previous, navigation }: any) => (
          <AppBar
            scene={scene}
            previous={previous}
            navigation={navigation}
            drawer={drawer}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "Home" }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerTitle: "Account" }}
      />
      <Stack.Screen
        name="Preference"
        component={Settings}
        options={{ headerTitle: "Preference" }}
      />
      <Stack.Screen
        name="Add New Note"
        component={AddNewNote}
        options={{ headerTitle: "Settings" }}
      />
      <Stack.Screen
        name="Credits"
        component={Credits}
        options={{ headerTitle: "Credits" }}
      />
      <Stack.Screen
        name="Working On!"
        component={WorkingOn}
        options={{ headerTitle: "Hold Still, We're Working!" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "Login" }}
      />
      <Stack.Screen
        name="Reminder"
        component={Reminder}
        options={{ headerTitle: "Reminder" }}
      />
      <Stack.Screen
        name="Expense Tracker"
        component={ExpenseTracker}
        options={{ headerTitle: "Expense" }}
      />
      <Stack.Screen
        name="Data Control"
        component={DataControl}
        options={{ headerTitle: "Data Control" }}
      />
      <Stack.Screen
        name="Privacy Policy"
        component={Privacy}
        options={{ headerTitle: "Privacy Policy" }}
      />
      <Stack.Screen
        name="Edit Account"
        component={AccountEdit}
        options={{ headerTitle: "Edit Account" }}
      />
    </Stack.Navigator>
  );
};
