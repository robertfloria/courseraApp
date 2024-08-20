import { FlatList, StyleSheet } from "react-native";
import { checkNotificationsData } from "../utils/data";
import { EmailNotifications } from "../../../utils/interfaces";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedCheckbox } from "@/components/ThemedCheckbox";

type Props = {
  checkNotifications: EmailNotifications;
  setCheckNotifications: (arg: any) => any;
};

export default function CheckEmailNotifications({
  checkNotifications,
  setCheckNotifications,
}: Props) {
  const handleChangeCheckNotifications = (key: keyof EmailNotifications) => {
    setCheckNotifications({
      ...checkNotifications,
      [key]: !checkNotifications[key],
    });
  };

  return (
    <ThemedView style={styles.notificationContainer}>
      <ThemedText>Email notifications</ThemedText>
      <FlatList
        data={checkNotificationsData}
        renderItem={({ item }) => {
          const key = item.id as keyof EmailNotifications;
          return (
            <ThemedCheckbox
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
    </ThemedView>
  );
}

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
