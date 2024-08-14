import { StyleSheet, TextInput, View } from "react-native";
import { UserInfo } from "../utils/interfaces";

type Props = {
    userInfo: UserInfo,
    setUserInfo: (arg: any) => any
};

export default function UserInfoFields({ userInfo, setUserInfo }: Props) {

    const handleChangeUserInfo = (e: string, key: string) => {
        setUserInfo({ ...userInfo, [key]: e });
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={userInfo.firstName}
                onChangeText={(e) => handleChangeUserInfo(e, 'firstName')}
                keyboardType="default"
                textContentType="givenName"
                placeholder={"Type first name"}
            />
            <TextInput
                style={styles.input}
                value={userInfo.lastName}
                onChangeText={(e) => handleChangeUserInfo(e, 'lastName')}
                keyboardType="default"
                textContentType="familyName"
                placeholder={"Type last name"}
            />
            <TextInput
                style={styles.input}
                value={userInfo.email}
                onChangeText={(e) => handleChangeUserInfo(e, 'email')}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder={"Type your email"}
            />
            <TextInput
                style={styles.input}
                value={userInfo.phoneNumber}
                onChangeText={(e) => handleChangeUserInfo(e, 'phoneNumber')}
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                placeholder={"Type your phone number"}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
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
});