import { StyleSheet, View } from "react-native";
import { BadgeCart } from "./BadgeCart";
import { ProfileScreenButton } from "./ProfileScreenButton";

export default function RightHeader() {
  return (
    <View style={styles.container}>
      <BadgeCart />
      <ProfileScreenButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
  },
});
