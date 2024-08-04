import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const retrieveAuthentication = async () => {
  try {
    const value = await AsyncStorage.getItem("authentication");
    if (value !== null) {
      const parsedData = JSON.parse(value);
      return parsedData;
    }
  } catch (error) {
    Alert.alert('Ne pare rau, a aparut o eroare!');
  }
};
