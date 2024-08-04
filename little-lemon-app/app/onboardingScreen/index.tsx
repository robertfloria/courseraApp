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
  Alert
} from "react-native";

export default function MenuScreen() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/images/little-lemon-logo.png")}
        />
        <Text style={styles.title}>
          Let us get to know you
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          // keyboardType='phone-pad'
          textContentType='givenName'
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
        <Button
          onPress={() => {
            Alert.alert("Thanks for subscribing, stay tuned!");
          }}
        >
          Subscribe
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    alignItems:'center',
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
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height:'auto'
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
