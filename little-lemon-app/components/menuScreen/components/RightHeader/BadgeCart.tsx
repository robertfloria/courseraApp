import { Colors } from "@/constants/Colors";
import { getUserShoppingItems } from "@/database/shoppingCartDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { RerenderContext } from "@/store/context/RerenderContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CounterProp = {
  number: number;
};

const Counter = ({ number }: CounterProp) => {
  const backgroundColor = useThemeColor({}, "firstColor");
  const color = Colors.dark.text;

  return (
    <View style={[{ backgroundColor: backgroundColor }, styles.counter]}>
      <Text style={[{ color: color }, styles.counterNumber]}>{number}</Text>
    </View>
  );
};

export function BadgeCart() {
  const [count, setCount] = useState<number>(0);
  const { resetCartCounter } = useContext(RerenderContext);

  const router = useRouter();
  const db = useSQLiteContext();

  const navigateToCart = () => router.push("/shoppingCart");

  const authentication = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      const shoppingCartItems = await getUserShoppingItems(
        db,
        authentication.email,
      );

      setCount(shoppingCartItems.length);
    })();
  }, [authentication, resetCartCounter]);

  return (
    <View style={styles.container}>
      <Counter number={count} />
      <Pressable onPress={navigateToCart}>
        <MaterialIcons
          name="shopping-cart"
          color={Colors.light.text}
          size={30}
        />
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
    padding: 3,
  },
  counter: {
    width: 15,
    height: 15,
    maxWidth: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  counterNumber: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
