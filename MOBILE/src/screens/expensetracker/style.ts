import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    margin: "6%",
  },
  expenseAmountNote: {
    marginTop: 10,
    fontSize: 12,
  },
  expenseSurface: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  expenseTitle: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
  },
  expenseForm: {
    marginTop: 20,
  },
  segmentedLogin: {
    marginTop: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  editBtn: {
    flexDirection: "row",
    marginTop: 4,
  },

  // Expense OverView Style

  expenseOverView: {
    marginTop: 20,
    flex: 1,
  },
  overViewSurface: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    width: width - 150,
    marginRight: 20,
  },
  overViewHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overViewTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overViewShowMore: {
    marginTop: 20,
  },
});
