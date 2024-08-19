import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getImage } from "../utils/functions";
import { MenuItems } from "@/utils/interfaces";

type Props = {
  data: MenuItems;
  setSelectedItem: (arg: any) => any;
};

export const SectionFoodItem = ({ data, setSelectedItem }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  const handleOpenModal = () => {
    setSelectedItem(data);
  };

  useEffect(() => {
    if (data.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data.image]);

  return (
    <Pressable onPress={handleOpenModal} style={styles.menuItemContainer}>
      <View style={styles.menuItemDetailsContainer}>
        <Text style={styles.menuItemTitle}>{data.name}</Text>
        <Text style={styles.menuItemDescription}>{data.description}</Text>
        <Text style={styles.menuItemPrice}>${data.price}</Text>
      </View>
      <Image style={styles.menuItemImage} source={image} resizeMode="cover" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  menuItemDetailsContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
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
    width: 200,
    height: 200,
  },
});
