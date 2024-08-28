import { getUserShoppingItems } from "@/database/shoppingCartDatabase";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { UserShoppingItem } from "@/utils/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FoodItem } from "../components/shoppingCartScreen/components/FoodItem";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Divider } from "react-native-paper";
import { HeaderContext } from "@/store/context/HeaderContext";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { deliveryPrice, servicePrice } from "@/components/shoppingCartScreen/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import Checkout from "@/components/shoppingCartScreen/components/Checkout";
import ExtraItemsList from "@/components/shoppingCartScreen/components/ExtraItemsList";

export default function ShoppingCartScreen() {
  const [data, setData] = useState<Array<UserShoppingItem>>([]);
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { resetCartCounter } = useContext(HeaderContext);

  const color = useThemeColor({}, 'text');

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
    let calculatedPrice = (deliveryPrice + servicePrice) as number;
    data.map((item) => {
      calculatedPrice = Math.abs(calculatedPrice + Number(item.price));
    });
    return calculatedPrice;
  }, [data]);

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        {
          data.length ?
            <Fragment>
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
                ListFooterComponentStyle={{ paddingTop: 25 }}
                renderItem={({ item }) => <FoodItem data={item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                  <Divider style={{ marginVertical: 10 }} />
                )}
                ListFooterComponent={() => <ExtraItemsList />}
                showsVerticalScrollIndicator={false}
                scrollEnabled
              />
              <Checkout totalPrice={totalPrice} />
            </Fragment>
            :
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <MaterialIcons name='no-food' color={color} size={70} />
              <ThemedText type='subtitle'>Please add items!</ThemedText>
            </View>
        }
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    padding: 15,
    gap: 30,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 15
  }
});
