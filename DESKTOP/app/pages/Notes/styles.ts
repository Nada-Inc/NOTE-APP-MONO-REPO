import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
  card: {
    height: "fit-content",
    backgroundColor: "#fdfdfd",
    color: "#000",
    marginLeft: "20px",
    marginBottom: "1rem",
  },
  fab: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
  },
  button: {
    backgroundColor: "#fff",
    color: "#000",
    width: "50%",
  },
  searchField: {
    width: "100%",
    marginTop: "10px",
  },
});
