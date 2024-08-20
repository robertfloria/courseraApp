import ThemedButton from "@/components/ThemedButton";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { UserInfo } from "../../../utils/interfaces";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";

type Props = {
  userInfo: UserInfo;
  setUserInfo: (arg: any) => any;
};

export default function PickAvatarImage({ userInfo, setUserInfo }: Props) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
    }
  };

  const removeImage = () => {
    setUserInfo({ ...userInfo, image: "" });
  };

  const avatarText = userInfo.firstName
    ? userInfo.firstName.substring(0, 2)
    : "";

  return (
    <ThemedView style={styles.container}>
      {userInfo.image ? (
        <Avatar.Image size={40} source={{ uri: userInfo.image }} />
      ) : (
        <Avatar.Text size={40} label={avatarText} />
      )}
      <ThemedButton onPress={pickImage}>Change</ThemedButton>
      <ThemedButton onPress={removeImage}>Remove</ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "auto",
    gap: 10,
  },
});
