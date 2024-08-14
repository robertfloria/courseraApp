import { FlatList, StyleSheet, Text, View } from "react-native";
import { checkNotificationsData } from "../utils/data";
import { CheckNotifications } from "../../../utils/interfaces";
import { Checkbox } from "react-native-paper";

type Props = {
    checkNotifications: CheckNotifications,
    setCheckNotifications: (arg: any) => any
};

export default function EmailNotifications({ checkNotifications, setCheckNotifications }: Props) {
    const handleChangeCheckNotifications = (key: keyof CheckNotifications) => {
        setCheckNotifications({ ...checkNotifications, [key]: !checkNotifications[key] });
    }

    return (
        <View style={styles.notificationContainer}>
            <Text>Email notifications</Text>
            <FlatList
                data={checkNotificationsData}
                renderItem={({ item }) => {
                    const key = item.id as keyof CheckNotifications;
                    return (
                        <Checkbox.Item
                            status={checkNotifications[key] ? "checked" : "unchecked"}
                            onPress={() => handleChangeCheckNotifications(key)}
                            label={item.label}
                            position="leading"
                            labelStyle={{ textAlign: "left" }}
                        />
                    );
                }}
                keyExtractor={(item) => item.id}
                nestedScrollEnabled
            />
        </View>
    )
};

const styles = StyleSheet.create({
    notificationContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "auto",
        gap: 10,
        width: "100%",
    },
});
