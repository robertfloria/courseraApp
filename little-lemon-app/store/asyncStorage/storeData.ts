import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const storeAuthentication = async (data: object) => {
  const stringnifiedData = JSON.stringify(data);

  try {
    await AsyncStorage.setItem("authentication", stringnifiedData);
  } catch (error) {
    Alert.alert("There was an error, please try again!");
    throw error;
  }
};
