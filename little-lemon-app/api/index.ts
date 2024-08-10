import { Alert } from "react-native";

const api =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

interface menu {
  menu: Array<any>
}
export const getFoodMenuItems = async (): Promise<menu> => {
  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dataMenu = response.json();
    return dataMenu;
  } catch (err) {
    Alert.alert(`An error occured`);
    throw err;
  }
};
