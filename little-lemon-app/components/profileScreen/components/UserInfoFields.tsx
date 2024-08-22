import { StyleSheet, View } from "react-native";
import { UserInfo } from "../../../utils/interfaces";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

type Props = {
  userInfo: UserInfo;
  setUserInfo: (arg: any) => any;
};

export default function UserInfoFields({ userInfo, setUserInfo }: Props) {
  const handleChangeUserInfo = (e: string, key: string) => {
    setUserInfo({ ...userInfo, [key]: e });
  };

  const firstColor = useThemeColor({}, "firstColor");

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Personal information</ThemedText>
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
