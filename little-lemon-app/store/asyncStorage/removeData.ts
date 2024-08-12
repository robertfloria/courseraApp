import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { retrieveAuthentication } from "./getData";
import { storeAuthentication } from "./storeData";

export const removeAuthentication = async () => {
  try {
    await AsyncStorage.removeItem("authentication");
  } catch (err) {
    Alert.alert("Ceva nu a mers bine!");
  }
};

export const removeAuthProperty = async (propertyName: string) => {
  try {
    const authentication = await retrieveAuthentication();
    delete authentication[propertyName];
    await storeAuthentication(authentication);
  } catch (err) {
    Alert.alert("Ceva nu a mers bine!");
    throw err;
  }
};
