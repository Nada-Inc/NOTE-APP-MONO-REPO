import { StyleSheet, Dimensions } from "react-native";

let screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  segmentedLogin: {
    marginTop: 20,
  },
  surfaceStyle: {
    padding: 15,
    width: screenWidth - 40,
    borderRadius: 20,
    marginTop: 10,
  },
  loginBtn: {
    marginTop: 10,
  },
  loginTopText: {
    marginBottom: 10,
    fontWeight: "bold",
    color: "#6b6b6b",
  },
  privacyPolicy: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 10,
  },
  loginDialog: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
});
