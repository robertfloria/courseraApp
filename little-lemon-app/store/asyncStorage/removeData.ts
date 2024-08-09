import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const removeAuthentication = async () => {
  try {
    await AsyncStorage.removeItem("authentication");
  } catch (err) {
    Alert.alert("Ceva nu a mers bine!");
  }
};
