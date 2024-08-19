import Button from "@/components/Button";
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

export default function ProfileScreen() {
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);

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
    router.push("/onboardingScreen");
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
      console.log(authentication.email);
      setUserInfo(userInfo);
      setCheckNotifications(checkNotifications);
    })();
  }, [authentication]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text>Personal information</Text>
        <PickAvatarImage userInfo={userInfo} setUserInfo={setUserInfo} />
        <UserInfoFields userInfo={userInfo} setUserInfo={setUserInfo} />
        <CheckEmailNotifications
          checkNotifications={checkNotifications}
          setCheckNotifications={setCheckNotifications}
        />
        <Button onPress={handleLogOut}>Log Out</Button>
        <View style={styles.handleChangesContainer}>
          <Button onPress={handleDiscardChanges}>Discard changes</Button>
          <Button onPress={handleSaveChanges}>Save changes</Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#93baad",
  },
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    gap: 20,
  },
  handleChangesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
