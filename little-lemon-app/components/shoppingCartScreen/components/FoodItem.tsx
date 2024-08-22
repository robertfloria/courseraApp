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
      <ThemedView
        style={{ flex: 1, gap: 10, flexDirection: "row", alignItems: "center" }}
      >
        <Image
          style={styles.menuItemImage}
          source={image}
          resizeMode="stretch"
        />
        <ThemedText>{data.name}</ThemedText>
      </ThemedView>
      <ThemedText type="defaultSemiBold">${data.price}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
});
