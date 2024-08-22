import ThemedButton from "@/components/ThemedButton";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";
import { UserInfo } from "../../../utils/interfaces";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { LinearGradient } from "expo-linear-gradient";
import { WaveSvg } from "@/components/svg/WaveSvg";
import { MaterialIcons } from "@expo/vector-icons";

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
  const thirdColor = useThemeColor({}, "thirdColor");

  return (
    <LinearGradient
      colors={[firstColor, thirdColor]}
      start={{ x: 1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={{
        display: "flex",
        gap: 15,
        marginHorizontal: -15,
        paddingHorizontal: 15,
      }}
    >
      <ThemedView
        lightColor="transparent"
        darkColor="transparent"
        style={styles.container}
      >
        <WaveSvg color={thirdColor} />

        <View style={{ flex: 1 }}>
          {userInfo.image ? (
            <Avatar.Image size={150} source={{ uri: userInfo.image }} />
          ) : (
            <Avatar.Text size={150} label={avatarText} />
          )}
          <ThemedButton
            style={{
              borderRadius: 100,
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: 7,
            }}
          >
            <MaterialIcons
              name="add-a-photo"
              size={25}
              color={thirdColor}
              onPress={pickImage}
            />
          </ThemedButton>
          <ThemedButton
            style={{
              borderRadius: 100,
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 7,
            }}
          >
            <MaterialIcons
              name="delete"
              size={25}
              color={thirdColor}
              onPress={removeImage}
            />
          </ThemedButton>
        </View>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
    height: "auto",
    gap: 10,
  },
  changeBtn: {
    borderWidth: 2,
  },
});
