import Button from "@/components/Button";
import { removeAuthentication } from "@/store/asyncStorage/removeData";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { fetchUserInfo } from "./utils/functions";
import { EmailNotifications, UserInfo } from "../../utils/interfaces";
import PickAvatarImage from "./components/PickAvatarImage";
import UserInfoFields from "./components/UserInfoFields";
import CheckEmailNotifications from "./components/CheckEmailNotifications";
import { useSQLiteContext } from "expo-sqlite";
import { createUserTables, editUserInfo } from "../../database/userDatabase";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { Authentication } from "@/utils/interfaces";
import { storeAuthentication } from "@/store/asyncStorage/storeData";

export default function ProfileScreen() {
  const db = useSQLiteContext();
  const [authentication, setAuthentication] = useState<Authentication>({
    email: "",
    firstName: "",
  });

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
    await editUserInfo(db, userInfo, checkNotifications, authentication.email);
    await storeAuthentication({
      ...authentication,
      firstName: userInfo.firstName,
    });
    Alert.alert("The informations has been saved!");
  };

  useEffect(() => {
    (async () => {
      const fetchAuthentication = await retrieveAuthentication();
      await createUserTables(db);

      const { userInfo, checkNotifications } = await fetchUserInfo(
        db,
        fetchAuthentication.email,
      );
      setUserInfo(userInfo);
      setCheckNotifications(checkNotifications);
      setAuthentication(fetchAuthentication);
    })();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
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
