import { SectionFoodItem } from "@/components/menuScreen/components/SectionFoodItem";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { themedButtonWidth } from "@/constants/constants";
import { getMenuItems } from "@/database/menuDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { MenuItems } from "@/utils/interfaces";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

type Props = {
  totalPrice: number;
};

export default function FooterItem({ totalPrice }: Props) {
  const [data, setData] = useState<Array<MenuItems>>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItems>();
  const db = useSQLiteContext();
  const separatorColor = useThemeColor({},'opacityGrey');

  useEffect(() => {
    (async () => {
      let menuItems = await getMenuItems(db);
      setData(menuItems);
    })();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        ItemSeparatorComponent={()=> <View style={{height:'100%', borderLeftWidth:1, borderColor:separatorColor, marginHorizontal:20}}/>}
        data={data}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SectionFoodItem horizontal data={item} setSelectedItem={setSelectedItem} />}
      />
      <View style={styles.itemContainer}>
        <ThemedText type="defaultSemiBold">Subtotal</ThemedText>
      </View>
      <View style={styles.itemContainer}>
        <ThemedText>
          Delivery
        </ThemedText>
        <ThemedText type="subtitle">${2.0}</ThemedText>
      </View>
      <View style={styles.itemContainer}>
        <ThemedText>
          Service
        </ThemedText>
        <ThemedText type="subtitle">${1.0}</ThemedText>
      </View>
      <Divider />
      <View style={styles.itemContainer}>
        <ThemedText type="subtitle">
          Total
        </ThemedText>
        <ThemedText type="title">${totalPrice.toFixed(2)}</ThemedText>
      </View>
      <ThemedButton>Checkout</ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 5,
    // paddingRight:themedButtonWidth
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
