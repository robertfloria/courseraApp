import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";
import { deliveryPrice, servicePrice } from "../constants";

type Props = {
  totalPrice: number;
};

export default function Checkout({ totalPrice }: Props) {
  const secondColor = useThemeColor({}, 'secondColor');

  return (
    <View style={styles.container}>
      <View style={styles.totalPriceContainer}>
        <View style={styles.itemContainer}>
          <ThemedText type="defaultSemiBold">Subtotal</ThemedText>
        </View>
        <View style={styles.itemContainer}>
          <ThemedText>
            Delivery
          </ThemedText>
          <ThemedText type='defaultSemiBold'>${deliveryPrice.toFixed(2)}</ThemedText>
        </View>
        <View style={styles.itemContainer}>
          <ThemedText>
            Service
          </ThemedText>
          <ThemedText type='defaultSemiBold'>${servicePrice.toFixed(2)}</ThemedText>
        </View>
        <Divider />
        <View style={styles.itemContainer}>
          <ThemedText type='subtitle'>
            Total
          </ThemedText>
          <ThemedText type="subtitle">${totalPrice.toFixed(2)}</ThemedText>
        </View>
      </View>
      <ThemedButton darkColor={secondColor} lightColor={secondColor} textColor={Colors.light.text}>Checkout</ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 30
  },
  totalPriceContainer: {
    display: 'flex',
    width: '100%',
    gap: 5,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
