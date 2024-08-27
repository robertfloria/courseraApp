import { getUserShoppingItems } from "@/database/shoppingCartDatabase";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { UserShoppingItem } from "@/utils/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { FoodItem } from "../components/shoppingCartScreen/components/FoodItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Divider } from "react-native-paper";
import { HeaderContext } from "@/store/context/HeaderContext";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import FooterItem from "@/components/shoppingCartScreen/components/FooterItem";

export default function ShoppingCartScreen() {
  const [data, setData] = useState<Array<UserShoppingItem>>([]);
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { resetCartCounter } = useContext(HeaderContext);

  useEffect(() => {
    (async () => {
      const shoppingCartItems = await getUserShoppingItems(
        db,
        authentication.email,
      );

      setData(shoppingCartItems);
    })();
  }, [authentication, resetCartCounter]);

  const totalPrice = useMemo(() => {
    let calculatedPrice = 0 as number;
    data.map((item) => {
      calculatedPrice = Math.abs(calculatedPrice + Number(item.price));
    });
    return calculatedPrice;
  }, [data]);

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.container}>
        <FlatList
          data={data}
          ListHeaderComponent={() => (
            <ThemedView style={styles.headerContainer}>
              <ThemedText type="subtitle">
                Order Summary
              </ThemedText>
            </ThemedView>
          )}
          stickyHeaderIndices={[0]}
          ListFooterComponentStyle={{ marginTop: 25 }}
          ListHeaderComponentStyle={{ marginBottom: 15 }}
          renderItem={({ item }) => <FoodItem data={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <Divider style={{ marginVertical: 10 }} />
          )}
          ListFooterComponent={() => <FooterItem totalPrice={totalPrice} />}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 15,
    gap: 20,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }
});
