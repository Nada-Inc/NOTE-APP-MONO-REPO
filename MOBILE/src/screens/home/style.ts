import { StyleSheet } from "react-native";

export const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 30
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 1,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardTimeStamp: {
    fontSize: 12,
    color: "#C0C0C0",
    marginTop: 10,
    marginBottom: 20,
  },
  cardTitleAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardAction: {
    flexDirection: "row",
  },
  noNoteScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70%",
    gap: 10,
  },
  noNoteScreenText: {
    fontSize: 16,
  },
  noteDateTitle: {
    marginLeft: 20,
    marginTop: 10,
  },
  reminderDetails: {
    fontSize: 12,
    color: "#6b6b6b",
    marginTop: 10,
  },
  reminderSurface: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 0,
    margin: 0,
    backgroundColor: "green",
  },
  doneMark: {
    backgroundColor: "#ffe08863",
    width: "20%",
    textAlign: "center",
    marginTop: 8,
    padding: 2,
    borderRadius: 8,
  },

  //expense
  expenseList: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  expenseType: {
    marginRight: 30,
    fontWeight: "bold",
  },
  expenseTotal: {
    fontWeight: "bold",
    marginTop: 15,
  },

  cardBadge: {
    // justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    gap: 4
  },
});
