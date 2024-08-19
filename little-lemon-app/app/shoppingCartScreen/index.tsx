import { createShoppingCartTable, getUserShoppingItems } from "@/database/shoppingCartDatabase";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { UserShoppingItem } from "@/utils/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { Fragment, useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { FoodItem } from "./components/FoodItem";

export default function ShoppingCartScreen() {
  const [data, setData] = useState<Array<UserShoppingItem>>([]);
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);

  useEffect(() => {
    (async () => {
      await createShoppingCartTable(db);
      const shoppingCartItems = await getUserShoppingItems(db, authentication.email);

      setData(shoppingCartItems);
    })();
  }, [authentication]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <FoodItem data={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 10,
    gap: 20,
  },
});
