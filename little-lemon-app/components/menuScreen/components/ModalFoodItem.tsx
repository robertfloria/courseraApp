import { useContext, useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getImage } from "../utils/functions";
import { MenuItems } from "@/utils/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { addItemInShoppingCart } from "@/database/shoppingCartDatabase";
import { HeaderContext } from "@/store/context/HeaderContext";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ThemedButton from "@/components/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

type Props = {
  data: MenuItems;
};

export const ModalFoodItem = ({ data }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { setResetResetCartCounter } = useContext(HeaderContext);

  const addItemToCart = async () => {
    await addItemInShoppingCart(data.id, authentication.email, db);
    setResetResetCartCounter((prevState: any) => !prevState);
  };

  useEffect(() => {
    if (data?.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedScrollView contentContainerStyle={styles.menuItemContainer}>
        <Image
          style={styles.menuItemImage}
          source={image}
          resizeMode="stretch"
        />
        <ThemedView style={styles.menuItemDetailsContainer}>
          <ThemedText type="defaultSemiBold">{data?.description}</ThemedText>
          <ThemedText>${data?.price}</ThemedText>
          <ThemedButton style={styles.button} onPress={addItemToCart}>
            Add to cart
          </ThemedButton>
        </ThemedView>
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuItemContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  menuItemDetailsContainer: {
    flex: 1,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  menuItemImage: {
    width: "100%",
    height: 250,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});
