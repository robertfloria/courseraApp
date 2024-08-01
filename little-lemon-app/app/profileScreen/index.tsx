import Button from "@/components/Button";
import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Text,
  TextInput,
  Alert,
  ScrollView,
  FlatList
} from "react-native";
import { Checkbox } from "react-native-paper";

const checkNotificationsData = [
  {
    id: 'orderStatuses',
    label: 'Order statuses',
  },
  {
    id: 'passwordChanges',
    label: 'Password changes',
  },
  {
    id: 'specialOffers',
    label: 'Special offers',
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
  },
];

interface Notifications {
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
}

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [checkNotifications, setCheckNotifications] = useState<Notifications>({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/little-lemon-logo.png")}

          />
          <Button
            onPress={() => {
              Alert.alert("Thanks for subscribing, stay tuned!");
            }}
          >
            Subscribe
          </Button>
          <Button
            onPress={() => {
              Alert.alert("Thanks for subscribing, stay tuned!");
            }}
          >
            Subscribe
          </Button>
        </View>
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            keyboardType='default'
            textContentType='givenName'
            placeholder={"Type first name"}
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            keyboardType='default'
            textContentType='familyName'
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
            keyboardType='phone-pad'
            textContentType='telephoneNumber'
            placeholder={"Type your phone number"}
          />
        </View>
        <View style={styles.notificationContainer}>
          <FlatList
            data={checkNotificationsData}
            renderItem={({ item }) => {
              const key = item.id as keyof Notifications;
              return (
                <Checkbox
                  status={checkNotifications[key] ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setCheckNotifications((prevState) => ({
                      ...prevState,
                      [key]: !prevState[key]
                    }));
                  }}
                />
              )
            }}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#93baad",
  },
  infoContainer: {
    display: 'flex',
    width: '80%'
  },
  input: {
    height: 40,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 'auto',
    gap: 10
  },
  notificationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 'auto',
    gap: 10,
    width: '100%'
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
