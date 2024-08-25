import LemonIcon from "@/assets/icons/LemonIcon";
import LoginCarousel from "@/components/onboardingScreen/LoginCarousel";
import { ScaleFingerPrint } from "@/components/onboardingScreen/ScaleFingerPrint";
import { WaveSvg } from "@/components/svg/WaveSvg";
import ThemedButton from "@/components/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { storeAuthentication } from "@/store/asyncStorage/storeData";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { validateEmail } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function MenuScreen() {
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [validForm, setValidForm] = useState<boolean>(false);
  const [onboarding, setOnboarding] = useState<boolean>(false);

  const thirdColor = useThemeColor({}, "thirdColor");
  const secondColor = useThemeColor({}, "secondColor");
  const firstColor = useThemeColor({}, "firstColor");

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
    if (authentication.email) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const isFormValid = Boolean(firstName && email);
    if (validForm != isFormValid) {
      setValidForm(isFormValid);
    }
  }, [email, firstName]);

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <LinearGradient
          colors={[firstColor, secondColor]}
          start={{ x: 1, y: 0.1 }}
          end={{ x: 1, y: 1 }}
          style={styles.titleContainer}
        >
          <WaveSvg color={thirdColor} />
          <LemonIcon width={130} height={130} />
          <ThemedText type="title" style={{ color: thirdColor }}>
            Little lemon app
          </ThemedText>
        </LinearGradient>
        <ThemedSafeAreaView style={[{ flex: onboarding ? 2 : 1 }, styles.infoContainer]}>
          {onboarding ?
            <Fragment>
              <ScaleFingerPrint />
              <LinearGradient
                colors={[secondColor, firstColor]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={[{ padding: 2 }, styles.gradientButton]}
              >
                <ThemedTextInput
                  value={firstName}
                  onChangeText={setFirstName}
                  keyboardType="default"
                  textContentType="givenName"
                  placeholder={"Type first name"}
                  style={styles.input}
                />
              </LinearGradient>
              <LinearGradient
                colors={[secondColor, firstColor]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={[{ padding: 2 }, styles.gradientButton]}
              >
                <ThemedTextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder={"Type your email"}
                  style={styles.input}
                />
              </LinearGradient>
              <LinearGradient
                colors={[secondColor, firstColor]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={[
                  { borderWidth: 1, borderColor: firstColor },
                  styles.gradientButton,
                ]}
              >
                <ThemedButton
                  style={styles.button}
                  onPress={handleSubscribe}
                  disabled={!validForm}
                >
                  Subscribe
                </ThemedButton>
              </LinearGradient>
            </Fragment>
            :
            <LoginCarousel setOnboarding={setOnboarding} />
          }
        </ThemedSafeAreaView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingTop: StatusBar.currentHeight,
  },
  input: {
    width: "100%",
    borderColor: "transparent",
  },
  button: {
    width: "100%",
    backgroundColor: "transparent",
  },
  gradientButton: {
    width: "100%",
    height: "auto",
    borderRadius: 8,
  },
  infoContainer: {
    display: "flex",
    width: "80%",
    gap: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "transparent"
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
    flex: 2.5,
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});
