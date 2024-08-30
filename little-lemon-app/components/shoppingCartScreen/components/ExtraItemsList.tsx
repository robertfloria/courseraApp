import { SectionFoodItem } from "@/components/menuScreen/components/SectionFoodItem";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MenuItems } from "@/utils/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useContext, } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { addItemInShoppingCart } from "@/database/shoppingCartDatabase";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { RerenderContext } from "@/store/context/RerenderContext";

type Props = {
  menuItems: Array<MenuItems>
};

export default function ExtraItemsList({ menuItems }: Props) {
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { setResetResetCartCounter } = useContext(RerenderContext);

  const separatorColor = useThemeColor({}, "opacityGrey");

  const addItemToCart = useCallback(async (itemId: number) => {
    await addItemInShoppingCart(itemId, authentication.email, 1, db);
    setResetResetCartCounter((prevState: any) => !prevState);
  }, []);

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Add More To Your Order!</ThemedText>
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={[{ borderColor: separatorColor }, styles.serparator]} />
        )}
        data={menuItems}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SectionFoodItem
            horizontal
            data={item}
            onPress={() => addItemToCart(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  serparator: {
    borderLeftWidth: 1,
    marginHorizontal: 20,
  },
  container: {
    display: "flex",
    gap: 30,
    flex: 1,
  },
});
