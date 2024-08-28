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
import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import CustomModal from "@/components/CustomModal";
import ModalOrderConfirmation from "@/components/shoppingCartScreen/components/ModalOrderConfirmation";
import { addOrder, insertShoppingItemsOrderId } from "@/database/ordersDatabase";

export default function ShoppingCartScreen() {
  const [data, setData] = useState<Array<UserShoppingItem>>([]);
  const db = useSQLiteContext();
  const authentication = useContext(AuthenticationContext);
  const { resetCartCounter, setResetResetCartCounter } = useContext(HeaderContext);
  const [openModal, setOpenModal] = useState(false);

  const color = useThemeColor({}, 'text');
  const secondColor = useThemeColor({}, 'secondColor');

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

  const handleOrder = async () => {
    const min = 1000000000; // 10-digit number minimum (1 followed by 9 zeros)
    const max = 9999999999; // 10-digit number maximum (9 followed by 9 nines)
    const orderId = (Math.floor(Math.random() * (max - min + 1)) + min).toString();

    setOpenModal(true);
    const insertedOrderId = await addOrder(orderId, totalPrice, db);
    await insertShoppingItemsOrderId(db, insertedOrderId, authentication.email);
    setResetResetCartCounter((prevState: any) => !prevState);
  }

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
              <ThemedButton darkColor={secondColor} lightColor={secondColor} textColor={Colors.light.text} onPress={handleOrder}>Order</ThemedButton>
            </Fragment>
            :
            <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <MaterialIcons name='no-food' color={color} size={70} />
              <ThemedText type='subtitle'>Please add items!</ThemedText>
            </View>
        }
      </ThemedView>
      {openModal && (
        <CustomModal
          openModal={openModal}
          onModalClose={() => setOpenModal(false)}
        >
          <ModalOrderConfirmation />
        </CustomModal>
      )}
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
