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
    <ScrollView contentContainerStyle={styles.menuItemContainer}>
      <Image style={styles.menuItemImage} source={image} resizeMode="stretch" />
      <View style={styles.menuItemDetailsContainer}>
        <Text style={styles.menuItemDescription}>{data?.description}</Text>
        <Text style={styles.menuItemPrice}>${data?.price}</Text>
        <Pressable style={styles.button} onPress={addItemToCart}>
          <Text>Add to cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  menuItemDetailsContainer: {
    flex: 1,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  menuItemTitle: {
    fontSize: 20,
    color: "white",
  },
  menuItemPrice: {
    fontSize: 20,
    color: "white",
  },
  menuItemDescription: {
    fontSize: 20,
    color: "grey",
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
    backgroundColor: "red",
  },
});
