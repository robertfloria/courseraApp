import { useContext, useEffect, useState } from "react";
import { Alert, Image, ImageSourcePropType, StyleSheet, View } from "react-native";
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
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import ItemCounter from "./ItemCounter";

type Props = {
  data: MenuItems;
  handleCloseModal: (arg?: any) => any;
};

export const ModalFoodItem = ({ data, handleCloseModal }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();
  const [counter, setCounter] = useState<number>(1);

  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { setResetResetCartCounter } = useContext(HeaderContext);

  const descriptionColor = useThemeColor({}, "grey");
  const secondColor = useThemeColor({}, "secondColor");

  const addItemToCart = async () => {
    await addItemInShoppingCart(data.id, authentication.email, db);
    setResetResetCartCounter((prevState: any) => !prevState);
    handleCloseModal();
    Alert.alert("Item added to cart!");
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
        <Image style={styles.menuItemImage} source={image} resizeMode="cover" />
        <ThemedView style={styles.menuItemDetailsContainer}>
          <ThemedText
            style={{ fontSize: 18, lineHeight: 0 }}
            lightColor={descriptionColor}
            darkColor={descriptionColor}
          >
            {data?.description}
          </ThemedText>
          <View style={styles.deliveryContainer}>
            <MaterialIcons color={secondColor} name='delivery-dining' size={40} />
            <ThemedText>Delivery time: </ThemedText>
            <ThemedText type='defaultSemiBold'>20 minutes</ThemedText>
          </View>
        </ThemedView>
        <ItemCounter counter={counter} setCounter={setCounter} />
        <ThemedButton
          textColor={Colors.dark.text}
          style={styles.button}
          onPress={addItemToCart}
        >
          Add for ${data?.price}
        </ThemedButton>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    gap: 15,
  },
  deliveryContainer: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemDetailsContainer: {
    display: "flex",
    width: "100%",
    gap: 10,
    backgroundColor: "transparent",
  },
  menuItemImage: {
    width: "100%",
    height: 250,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    display: "flex",
  },
});
