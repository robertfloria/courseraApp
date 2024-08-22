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
      <ThemedText type="subtitle">Email notifications</ThemedText>
      <FlatList
        data={checkNotificationsData}
        renderItem={({ item }) => {
          const key = item.id as keyof EmailNotifications;
          return (
            <ThemedCheckbox
              status={checkNotifications[key] ? "checked" : "indeterminate"}
              onPress={() => handleChangeCheckNotifications(key)}
              label={item.label}
              position="leading"
              labelStyle={{ textAlign: "left" }}
              uncheckedColor="blue"
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
    gap: 5,
    width: "100%",
  },
});
