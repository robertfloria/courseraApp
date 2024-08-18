import { StyleSheet } from "react-native";

export default function ShoppingCartScreen() {
  return <></>;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#93baad",
  },
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    gap: 20,
  },
  handleChangesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
