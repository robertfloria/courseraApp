import { useContext, useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { UserShoppingItem } from "@/utils/interfaces";
import { getImage } from "@/components/menuScreen/utils/functions";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Swipeable } from "react-native-gesture-handler";
import ThemedButton from "@/components/ThemedButton";
import { deleteItemInShoppingCart } from "@/database/shoppingCartDatabase";
import { useSQLiteContext } from "expo-sqlite";
import { HeaderContext } from "@/store/context/HeaderContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

type Props = {
  data: UserShoppingItem;
};

export const FoodItem = ({ data }: Props) => {
  const [image, setImage] = useState<ImageSourcePropType>();
  const db = useSQLiteContext();
  const { setResetResetCartCounter } = useContext(HeaderContext);

  const deleteColor = useThemeColor({}, "red");

  useEffect(() => {
    if (data.image) {
      const imagePath = getImage(data.image);
      setImage(imagePath);
    }
  }, [data.image]);

  const handleDeleteItem = async () => {
    await deleteItemInShoppingCart(data.id, db);
    setResetResetCartCounter((prevState: any) => !prevState);
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <ThemedButton
          textColor={Colors.dark.text}
          lightColor={deleteColor}
          darkColor={deleteColor}
          style={{ marginLeft: 10, borderRadius: 3 }}
          onPress={handleDeleteItem}
        >
          DELETE
        </ThemedButton>
      )}
    >
      <ThemedView style={styles.menuItemContainer}>
        <ThemedView
          style={{
            flex: 1,
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
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
    </Swipeable>
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
