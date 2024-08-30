import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

type Props = {
  handleCloseModal: (arg?: any) => any;
};

export default function ModalOrderConfirmation({ handleCloseModal }: Props) {
  const secondColor = useThemeColor({}, "secondColor");
  const router = useRouter();

  const handleTrackOrder = () => {
    router.push("/trackOrder");
    handleCloseModal();
  };

  return (
    <View style={styles.container}>
      <View style={[{ backgroundColor: secondColor }, styles.iconContainer]}>
        <MaterialIcons
          name="shopping-bag"
          size={100}
          color={Colors.light.text}
        />
      </View>
      <ThemedText type="defaultSemiBold">
        Your Order Has Been Placed!
      </ThemedText>
      <ThemedButton onPress={handleTrackOrder}>Track Order</ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  iconContainer: {
    padding: 15,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
