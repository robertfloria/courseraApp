import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { getImage } from "../utils/functions";
import { MenuItems } from "@/utils/interfaces";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  data: MenuItems;
  setSelectedItem: (arg: any) => any;
};

export const SectionFoodItem = ({ data, setSelectedItem }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  const handleOpenModal = () => {
    setSelectedItem(data);
  };

  const descriptionColor = useThemeColor({}, 'grey');

  useEffect(() => {
    if (data.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data.image]);

  return (
    <TouchableOpacity
      onPress={handleOpenModal}
      style={styles.menuItemContainer}
    >
      <ThemedView style={styles.menuItemDetailsContainer}>
        <ThemedText type="subtitle" style={{ flex: 1 }}>
          {data.name}
        </ThemedText>
        <ThemedText lightColor={descriptionColor} darkColor={descriptionColor}>{data.description}</ThemedText>
        <ThemedText type='defaultSemiBold'>${data.price}</ThemedText>
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
    paddingVertical: 10,
    gap: 10,
  },
  menuItemDetailsContainer: {
    flex: 1,
    display: "flex",
    height: "100%",
    justifyContent: "space-between",
    gap: 10,
  },
  menuItemImage: {
    width: 120,
    height: 120,
    borderRadius: 5
  },
});
