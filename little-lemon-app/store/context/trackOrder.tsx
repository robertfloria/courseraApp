import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedDeliveryIcon } from "@/components/trackOrderScreen/AnimatedDeliveryIcon";
import { getSectionListData } from "@/components/trackOrderScreen/utils/functions";
import { estimatedDeliveryTime } from "@/constants/constants";
import { getUserOrders } from "@/database/ordersDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { RerenderContext } from "@/store/context/RerenderContext";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

export default function TrackOrderScreen() {
  const [data, setData] = useState<any>([]);
  const [estimatedTime, setEstimatedTime] = useState<Date>(new Date());

  const authentication = useContext(AuthenticationContext);
  const db = useSQLiteContext();
  const { resetTrackOrder } = useContext(RerenderContext);

  const thirdColor = useThemeColor({}, "thirdColor");

  useEffect(() => {
    (async () => {
      const fetchData = await getUserOrders(db, authentication.email);
      const sectionListData = getSectionListData(fetchData);
      setData(sectionListData);
    })();
  }, [resetTrackOrder]);

  useEffect(() => {
    if (data.length) {
      let maxCreatedDate = data.reduce(function (a: any, b: any) {
        return a > b ? a : b;
      }, []).createdDate;

      maxCreatedDate = new Date(maxCreatedDate);
      maxCreatedDate.setMinutes(maxCreatedDate.getMinutes() + estimatedDeliveryTime);

      setEstimatedTime(maxCreatedDate);
    }
  }, [data])

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.iconContainer}>
          <AnimatedDeliveryIcon />
          <ThemedView style={{ display: 'flex', gap: 5, flexDirection: 'row' }}>
            <ThemedText type='defaultSemiBold'>Estimated time: </ThemedText>
            <ThemedText type='subtitle'>{estimatedTime.toLocaleTimeString()}</ThemedText>
          </ThemedView>
        </ThemedView>
        <SectionList
          sections={data}
          keyExtractor={(orderId) => orderId}
          renderItem={({ item }) => (
            <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
              <ThemedText>{item.multiply}x</ThemedText>
              <ThemedText>{item.name}</ThemedText>
            </View>
          )}
          renderSectionFooter={({ section: { finalPrice } }) => (
            <View style={{ display: "flex", gap: 5, paddingVertical: 10 }}>
              <ThemedText type="defaultSemiBold">Total</ThemedText>
              <ThemedText type="subtitle">{finalPrice.toFixed(2)}</ThemedText>
              <Divider />
            </View>
          )}
          renderSectionHeader={({ section: { orderId } }) => (
            <ThemedText
              type="defaultSemiBold"
              style={{ backgroundColor: thirdColor, paddingBottom: 10 }}
            >
              Order:
              <ThemedText type="subtitle"> {orderId}</ThemedText>
            </ThemedText>
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 15,
  },
});
