import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getImage } from "../utils/functions";
import { MenuItems } from "@/utils/interfaces";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

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
    <TouchableOpacity onPress={handleOpenModal} style={styles.menuItemContainer}>
      <ThemedView style={styles.menuItemDetailsContainer}>
        <ThemedText type='subtitle'>{data.name}</ThemedText>
        <ThemedText type='defaultSemiBold'>{data.description}</ThemedText>
        <ThemedText>${data.price}</ThemedText>
      </ThemedView>
      <Image style={styles.menuItemImage} source={image} resizeMode="cover" />
    </TouchableOpacity>
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
  menuItemImage: {
    width: 200,
    height: 200,
  },
});
