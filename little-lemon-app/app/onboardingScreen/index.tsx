import Button from "@/components/Button";
import { storeAuthentication } from "@/store/asyncStorage/storeData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { validateEmail } from "@/utils";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  Text,
  TextInput,
  Alert,
} from "react-native";

export default function MenuScreen() {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validForm, setValidForm] = useState<boolean>(false);

  const authentication = useContext(AuthenticationContext);

  const router = useRouter();

  const handleSubscribe = async () => {
    if (firstName && email) {
      const isEmailValid = validateEmail(email);

      if (isEmailValid) {
        const authenticationData = {
          firstName: firstName,
          email: email,
        };
        await storeAuthentication(authenticationData);
        authentication.setAuthentication(authenticationData);
        router.push("/");
      } else {
        Alert.alert("Email-ul introdus nu este corect!");
      }
    } else {
      Alert.alert("Please, fill all the required inputs!");
    }
  };

  useEffect(() => {
    const isFormValid = Boolean(firstName && email);
    if (validForm != isFormValid) {
      setValidForm(isFormValid);
    }
  }, [email, firstName]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/little-lemon-logo.png")}
        />
        <Text style={styles.title}>Let us get to know you</Text>
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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder={"Type your email"}
        />
        <Button onPress={handleSubscribe} disabled={!validForm}>
          Subscribe
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#93baad",
  },
  infoContainer: {
    display: "flex",
    width: "80%",
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
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "auto",
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
