import ThemedButton from "@/components/ThemedButton";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { UserInfo } from "../../../utils/interfaces";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

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

  const firstColor = useThemeColor({}, "firstColor");

  return (
    <ThemedView style={styles.container}>
      {userInfo.image ? (
        <Avatar.Image size={100} source={{ uri: userInfo.image }} />
      ) : (
        <Avatar.Text size={100} label={avatarText} />
      )}
      <ThemedButton
        textColor={firstColor}
        style={{ borderWidth: 2, borderColor: firstColor }}
        darkColor="transparent"
        lightColor="transparent"
        onPress={pickImage}
      >
        Change
      </ThemedButton>
      <ThemedButton textColor={Colors.dark.text} onPress={removeImage}>
        Remove
      </ThemedButton>
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
  changeBtn: {
    borderWidth: 2,
  },
});
