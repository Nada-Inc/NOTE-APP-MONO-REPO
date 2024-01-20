import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    gap: 6,
  },
  cardProfile: {
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  profileName: {
    fontWeight: "bold",
    marginTop: 10,
  },
  sync: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginTop: 10,
  },
  syncText: {
    fontSize: 14,
    color: "#6b6b6b",
  },
  cardProfileSettings: {
    padding: 20,
    borderRadius: 20,
    justifyContent: "flex-start",
    marginTop: 10,
  },
  cardProfileSettingsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
  settingsText: {
    fontSize: 16,
    color: "#6b6b6b",
  },
  settings: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
  },

  //Account Edit

  accountEditContainer: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarView: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
    justifyContent: "space-between",
  },
  avatarContainer: {
    position: "relative",
    borderRadius: 100,
    overflow: "hidden",
  },
  avatarEditBadge: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "#000",
    padding: 10,
    paddingLeft: 50,
    zIndex: 1,
    opacity: 0.5,
    paddingRight: 50,
  },
});
