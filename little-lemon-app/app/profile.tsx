import ThemedButton from "@/components/ThemedButton";
import { removeAuthentication } from "@/store/asyncStorage/removeData";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { fetchUserInfo } from "../components/profileScreen/utils/functions";
import { EmailNotifications, UserInfo } from "../utils/interfaces";
import PickAvatarImage from "../components/profileScreen/components/PickAvatarImage";
import UserInfoFields from "../components/profileScreen/components/UserInfoFields";
import CheckEmailNotifications from "../components/profileScreen/components/CheckEmailNotifications";
import { useSQLiteContext } from "expo-sqlite";
import { editUserInfo } from "../database/userDatabase";
import { storeAuthentication } from "@/store/asyncStorage/storeData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { validateEmail } from "@/utils";
import { HeaderContext } from "@/store/context/HeaderContext";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { Divider } from "react-native-paper";

export default function ProfileScreen() {
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { setResetPicture } = useContext(HeaderContext);

  const firstColor = useThemeColor({}, 'firstColor');

  const [userInfo, setUserInfo] = useState<UserInfo>({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [checkNotifications, setCheckNotifications] =
    useState<EmailNotifications>({
      orderStatuses: true,
      passwordChanges: true,
      specialOffers: true,
      newsletter: true,
    });

  const router = useRouter();

  const handleLogOut = async () => {
    await removeAuthentication();
    authentication.setAuthentication({ email: "", firstName: "" });
    router.push("/onboarding");
  };

  const handleDiscardChanges = async () => {
    const { userInfo, checkNotifications } = await fetchUserInfo(
      db,
      authentication.email,
    );

    setUserInfo(userInfo);
    setCheckNotifications(checkNotifications);

    Alert.alert("The informations has been discarded!");
  };

  const handleSaveChanges = async () => {
    if (userInfo.email && validateEmail(userInfo.email) && userInfo.firstName) {
      await editUserInfo(
        db,
        userInfo,
        checkNotifications,
        authentication.email,
      );
      await storeAuthentication({
        email: userInfo.email,
        firstName: userInfo.firstName,
      });

      setResetPicture((prevState: any) => !prevState);

      Alert.alert("The informations has been saved!");
    } else {
      Alert.alert("Email or firstname is empty!");
    }
  };

  useEffect(() => {
    (async () => {
      const { userInfo, checkNotifications } = await fetchUserInfo(
        db,
        authentication.email,
      );

      setUserInfo(userInfo);
      setCheckNotifications(checkNotifications);
    })();
  }, [authentication]);

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedScrollView contentContainerStyle={styles.container}>
        <ThemedText type='subtitle'>Personal information</ThemedText>
        <PickAvatarImage userInfo={userInfo} setUserInfo={setUserInfo} />
        <UserInfoFields userInfo={userInfo} setUserInfo={setUserInfo} />
        <Divider />
        <CheckEmailNotifications
          checkNotifications={checkNotifications}
          setCheckNotifications={setCheckNotifications}
        />
        <Divider />
        <ThemedView style={styles.handleChangesContainer}>
          <ThemedView style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
            <ThemedButton textColor={Colors.dark.text} style={{ flex: 1 }} onPress={handleDiscardChanges}>
              Discard changes
            </ThemedButton>
            <ThemedButton textColor={Colors.dark.text} style={{ flex: 1 }} onPress={handleSaveChanges}>Save changes</ThemedButton>
          </ThemedView>
          <ThemedButton textColor={firstColor} style={{ borderWidth: 2, borderColor: firstColor }} darkColor="transparent" lightColor="transparent" onPress={handleLogOut}>Log Out</ThemedButton>
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
    gap: 20,
  },
  handleChangesContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
