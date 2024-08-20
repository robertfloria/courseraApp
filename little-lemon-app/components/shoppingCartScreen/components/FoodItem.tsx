import { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { UserShoppingItem } from "@/utils/interfaces";
import { getImage } from "@/components/menuScreen/utils/functions";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type Props = {
  data: UserShoppingItem;
};

export const FoodItem = ({ data }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  useEffect(() => {
    if (data.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data.image]);

  return (
    <ThemedView style={styles.menuItemContainer}>
      <Image style={styles.menuItemImage} source={image} resizeMode="stretch" />
      <ThemedText>{data.name}</ThemedText>
      <ThemedText>${data.price}</ThemedText>
    </ThemedView>
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
    gap: 5,
  },
  menuItemImage: {
    width: 50,
    height: 50,
  },
});
