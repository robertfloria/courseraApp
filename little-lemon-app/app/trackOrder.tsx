import ThemedButton from "@/components/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedDeliveryIcon } from "@/components/trackOrderScreen/AnimatedDeliveryIcon";
import { getSectionListData } from "@/components/trackOrderScreen/utils/functions";
import { Colors } from "@/constants/Colors";
import { estimatedDeliveryTime } from "@/constants/constants";
import { routes } from "@/constants/Routes";
import { finalisedOrders, getUserOrders } from "@/database/ordersDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { RerenderContext } from "@/store/context/RerenderContext";
import { TrackDeliveryContext } from "@/store/context/TrackDeliveryContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

export default function TrackOrderScreen() {
  const [data, setData] = useState<any>([]);
  const [estimatedTime, setEstimatedTime] = useState<Date | null>(null);

  const router = useRouter();

  const authentication = useContext(AuthenticationContext);
  const db = useSQLiteContext();
  const { resetTrackOrder, setResetTrackOrder } = useContext(RerenderContext);
  const { setDeliveryTime, delivered, setDelivered } = useContext(TrackDeliveryContext);

  const grey = useThemeColor({}, "grey");
  const textColor = useThemeColor({}, "text");
  const firstColor = useThemeColor({}, "firstColor");
  const secondColor = useThemeColor({}, "secondColor");

  useEffect(() => {
    (async () => {
      const fetchData = await getUserOrders(db, authentication.email);
      const sectionListData = getSectionListData(fetchData);
      setData(sectionListData);
    })();
  }, [resetTrackOrder]);

  useEffect(() => {
    if (data.length) {
      const maxCreatedDate = data.reduce(function (a: any, b: any) {
        return a.createdDate > b.createdDate ? a.createdDate : b.createdDate;
      }, []);

      let finalDeliveryTime = new Date(maxCreatedDate);
      finalDeliveryTime.setMinutes(
        finalDeliveryTime.getMinutes() + estimatedDeliveryTime,
      );

      setEstimatedTime(finalDeliveryTime);
      setDeliveryTime(finalDeliveryTime);
    }
  }, [data]);

  const cancelOrder = async () => {
    const ordersId = data.map((item: any) => item.orderId);
    await finalisedOrders(db, ordersId);
    setResetTrackOrder((prevState: any) => !prevState);
    setDelivered(false);
    setEstimatedTime(null);
    setDeliveryTime(null);
  }

  useEffect(() => {
    if (delivered && data) {
      (async () => {
        await cancelOrder();
      })();
    }
  }, [delivered, data]);

  if (!estimatedTime) {
    router.push(routes.home);
  }

  return (
    <ThemedSafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.iconContainer}>
          <AnimatedDeliveryIcon />
          {estimatedTime && (
            <ThemedView
              style={{
                display: "flex",
                gap: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="timer" size={30} color={textColor} />
              <ThemedText type="defaultSemiBold">Estimated time: </ThemedText>
              <ThemedText type="title">
                {estimatedTime?.getHours() + ":" + estimatedTime?.getMinutes()}
              </ThemedText>
            </ThemedView>
          )}
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
              <ThemedText
                lightColor={firstColor}
                darkColor={firstColor}
                type="subtitle"
              >
                ${finalPrice.toFixed(2)}
              </ThemedText>
              <Divider />
            </View>
          )}
          ListFooterComponent={() => <ThemedButton darkColor={secondColor} lightColor={secondColor} textColor={Colors.light.text} onPress={cancelOrder}>Cancel order</ThemedButton>}
          renderSectionHeader={({ section: { orderId } }) => (
            <ThemedText type="defaultSemiBold" style={{ paddingBottom: 10 }}>
              Order:
              <ThemedText lightColor={grey} darkColor={grey}>
                {" "}
                #{orderId}
              </ThemedText>
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
    gap: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 25,
  },
});
