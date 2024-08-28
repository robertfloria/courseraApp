import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AnimatedDeliveryIcon } from "@/components/trackOrderScreen/AnimatedDeliveryIcon";
import { getSectionListData } from "@/components/trackOrderScreen/utils/functions";
import { getUserOrders } from "@/database/ordersDatabase";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AuthenticationContext } from "@/store/context/AuthenticationContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";

export default function TrackOrderScreen() {
    const [data, setData] = useState<any>([]);
    const authentication = useContext(AuthenticationContext);
    const db = useSQLiteContext();

    const thirdColor = useThemeColor({}, 'thirdColor');
    const secondColor = useThemeColor({}, 'secondColor');

    useEffect(() => {
        (async () => {
            const fetchData = await getUserOrders(db, authentication.email);
            const sectionListData = getSectionListData(fetchData);
            setData(sectionListData);
        })()
    }, []);

    return (
        <ThemedSafeAreaView style={{ flex: 1 }}>
            <ThemedView style={styles.container}>
                <ThemedView style={styles.iconContainer}>
                    <AnimatedDeliveryIcon/>
                </ThemedView>
                <SectionList
                    sections={data}
                    keyExtractor={(index) => index}
                    renderItem={({ item }) => (
                        <View style={{ display: 'flex' }}>
                            <ThemedText>{item.finalPrice}</ThemedText>
                            <ThemedText>{item.name}</ThemedText>
                            <ThemedText>{item.createdDate}</ThemedText>
                            <ThemedText>{item.multiply}</ThemedText>
                        </View>
                    )}
                    renderSectionHeader={({ section: { orderId } }) => (
                        <ThemedText
                            type="subtitle"
                            style={{ backgroundColor: thirdColor, paddingVertical: 15 }}
                        >
                            Order: {orderId}
                        </ThemedText>
                    )}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled
                />
            </ThemedView>
        </ThemedSafeAreaView>
    )
}


const styles = StyleSheet.create({
    iconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal: 15
    }
});
