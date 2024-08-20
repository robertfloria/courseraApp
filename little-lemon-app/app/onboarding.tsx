import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { storeAuthentication } from "@/store/asyncStorage/storeData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { validateEmail } from "@/utils";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/little-lemon-logo.png")}
          />
          <ThemedText type="title">Let us get to know you</ThemedText>
        </ThemedView>
        <ThemedView style={styles.infoContainer}>
          <ThemedTextInput
            value={firstName}
            onChangeText={setFirstName}
            keyboardType="default"
            textContentType="givenName"
            placeholder={"Type first name"}
          />
          <ThemedTextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholder={"Type your email"}
          />
          <ThemedButton onPress={handleSubscribe} disabled={!validForm}>
            Subscribe
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
  },
  infoContainer: {
    display: "flex",
    width: "80%",
    gap: 10,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "auto",
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
