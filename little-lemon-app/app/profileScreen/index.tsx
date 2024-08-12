import Button from "@/components/Button";
import { retrieveAuthentication } from "@/store/asyncStorage/getData";
import { removeAuthentication } from "@/store/asyncStorage/removeData";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
  TextInput,
  Alert,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Avatar, Checkbox } from "react-native-paper";

const checkNotificationsData = [
  {
    id: "orderStatuses",
    label: "Order statuses",
  },
  {
    id: "passwordChanges",
    label: "Password changes",
  },
  {
    id: "specialOffers",
    label: "Special offers",
  },
  {
    id: "newsletter",
    label: "Newsletter",
  },
];

interface Notifications {
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
}

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [checkNotifications, setCheckNotifications] = useState<Notifications>({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

  const router = useRouter();

  const [name, setName] = useState('');
  const [image, setImage] = useState<any>('');

  const handleLogOut = async () => {
    await removeAuthentication();
    router.push("/onboardingScreen");
  };

  useEffect(() => {
    (async () => {
      const authentication = await retrieveAuthentication();
      setName(authentication.firstName);
      setImage(authentication?.image);
    })();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text>Personal information</Text>
      <View style={styles.logoContainer}>
        {image ?
          <Avatar.Icon size={40} icon={image} />
          :
          <Avatar.Text size={40} label={name.substring(0, 2)} />
        }
        <Button
          onPress={() => {
            Alert.alert("Thanks for subscribing, stay tuned!");
          }}
        >
          Change
        </Button>
        <Button
          onPress={() => {
            Alert.alert("Thanks for subscribing, stay tuned!");
          }}
        >
          Remove
        </Button>
      </View>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          keyboardType="default"
          textContentType="givenName"
          placeholder={"Type first name"}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          keyboardType="default"
          textContentType="familyName"
          placeholder={"Type last name"}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder={"Type your email"}
        />
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder={"Type your phone number"}
        />
      </View>
      <View style={styles.notificationContainer}>
        <Text>Email notifications</Text>
        <FlatList
          data={checkNotificationsData}
          renderItem={({ item }) => {
            const key = item.id as keyof Notifications;
            return (
              <Checkbox.Item
                status={checkNotifications[key] ? "checked" : "unchecked"}
                onPress={() => {
                  setCheckNotifications((prevState) => ({
                    ...prevState,
                    [key]: !prevState[key],
                  }));
                }}
                label={item.label}
                position="leading"
                labelStyle={{ textAlign: "left" }}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Button onPress={handleLogOut}>Log Out</Button>
      <View style={styles.handleChangesContainer}>
        <Button
          onPress={() => {
            Alert.alert("Thanks for subscribing, stay tuned!");
          }}
        >
          Discard changes
        </Button>
        <Button
          onPress={() => {
            Alert.alert("Thanks for subscribing, stay tuned!");
          }}
        >
          Save changes
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#93baad",
    overflow: "scroll",
    gap: 20,
  },
  infoContainer: {
    display: "flex",
    width: "100%",
    rowGap: 20,
  },
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "auto",
    gap: 10,
  },
  handleChangesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    gap: 10,
  },
  notificationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "auto",
    gap: 10,
    width: "100%",
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
