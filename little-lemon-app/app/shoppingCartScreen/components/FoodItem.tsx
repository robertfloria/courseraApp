import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { UserShoppingItem } from "@/utils/interfaces";
import { getImage } from "@/app/(menuScreen)/utils/functions";

type Props = {
  data: UserShoppingItem;
};

export const FoodItem = ({
  data
}: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  useEffect(() => {
    if (data.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data.image]);

  return (
    <View style={styles.menuItemContainer}>
      <Image style={styles.menuItemImage} source={image} resizeMode="stretch" />
      <Text style={styles.menuItemTitle}>{data.name}</Text>
      <Text style={styles.menuItemPrice}>${data.price}</Text>
    </View>
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
    gap:5
  },
  menuItemTitle: {
    fontSize: 20,
    color: "white",
  },
  menuItemPrice: {
    fontSize: 20,
    color: "white",
    flex: 1,
    textAlign: 'right'
  },
  menuItemImage: {
    width: 50,
    height: 50,
  },
});
