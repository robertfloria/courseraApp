import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExpoRouter } from "expo-router/types/expo-router";
import { Alert } from "react-native";


export const storeAuthentication = async (data: object, router: ExpoRouter.Router) => {
  const stringnifiedData = JSON.stringify(data);

  try {
    await AsyncStorage.setItem("authentication", stringnifiedData);
    router.push('/');
  } catch (error) {
    Alert.alert("There was an error, please try again!");
  }
};
