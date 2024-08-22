import { StyleSheet, View } from "react-native";
import { UserInfo } from "../../../utils/interfaces";
import { ThemedTextInput } from "@/components/ThemedTextInput";

type Props = {
  userInfo: UserInfo;
  setUserInfo: (arg: any) => any;
};

export default function UserInfoFields({ userInfo, setUserInfo }: Props) {
  const handleChangeUserInfo = (e: string, key: string) => {
    setUserInfo({ ...userInfo, [key]: e });
  };

  return (
    <View style={styles.container}>
      <ThemedTextInput
        value={userInfo.firstName}
        onChangeText={(e) => handleChangeUserInfo(e, "firstName")}
        keyboardType="default"
        textContentType="givenName"
        placeholder={"Type first name"}
      />
      <ThemedTextInput
        value={userInfo.lastName}
        onChangeText={(e) => handleChangeUserInfo(e, "lastName")}
        keyboardType="default"
        textContentType="familyName"
        placeholder={"Type last name"}
      />
      <ThemedTextInput
        value={userInfo.email}
        onChangeText={(e) => handleChangeUserInfo(e, "email")}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder={"Type your email"}
      />
      <ThemedTextInput
        value={userInfo.phoneNumber}
        onChangeText={(e) => handleChangeUserInfo(e, "phoneNumber")}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        placeholder={"Type your phone number"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    rowGap: 20,
  },
});
