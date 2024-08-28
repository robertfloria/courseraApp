import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { getImage } from "../utils/functions";
import { MenuItems } from "@/utils/interfaces";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

type Props = {
  data: MenuItems;
  horizontal?: boolean;
  setSelectedItem: (arg: any) => any;
};

export const SectionFoodItem = ({ data, horizontal = false, setSelectedItem }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();

  const handleOpenModal = () => {
    setSelectedItem(data);
  };

  const descriptionColor = useThemeColor({}, "grey");

  useEffect(() => {
    if (data.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data.image]);

  const handleDescription = (description: string) => {
    if (horizontal && description.length > 15) {
      return description.substring(0, 14) + '...';
    }

    return description;
  }

  return (
    <TouchableOpacity
      onPress={handleOpenModal}
      style={styles.menuItemContainer}
    >
      <ThemedView style={styles.menuItemDetailsContainer}>
        <ThemedText type='defaultSemiBold'>
          {data.name}
        </ThemedText>
        <View>
          <ThemedText lightColor={descriptionColor} darkColor={descriptionColor}>
            {handleDescription(data.description)}
          </ThemedText>
        </View>
        <ThemedText type="defaultSemiBold">${data.price}</ThemedText>
      </ThemedView>
      <Image style={[styles.menuItemImage, horizontal && { width: 100, height: 100 }]} source={image} resizeMode="cover" />
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
    borderRadius: 5,
  },
});
