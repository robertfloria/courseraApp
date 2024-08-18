import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CounterProp = {
  number: number;
};

const Counter = ({ number }: CounterProp) => {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterNumber}>{number}</Text>
    </View>
  );
};

export function BadgeCart() {
  const router = useRouter();

  const navigateToCart = () => router.push("/cart");

  return (
    <View style={styles.container}>
      <Counter number={10} />
      <Pressable onPress={navigateToCart}>
        <MaterialIcons name="shopping-cart" color="#fff" size={35} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  counter: {
    width: 15,
    height: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#347aeb",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  counterNumber: {
    fontSize: 10,
  },
});
