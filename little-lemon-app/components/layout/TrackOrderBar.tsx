import { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TrackDeliveryContext } from "@/store/context/TrackDeliveryContext";
import { AnimatedDeliveryIcon } from "../trackOrderScreen/AnimatedDeliveryIcon";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";

export default function TrackOrderBar() {
  const { deliveryTime } = useContext(TrackDeliveryContext);
  const firstColor = useThemeColor({}, "firstColor");
  const secondColor = useThemeColor({}, "secondColor");
  const router = useRouter();

  const handleTrackOrderNavigation = () => router.push('/trackOrder');

  return (
    <TouchableOpacity style={[{ backgroundColor: secondColor }, styles.container]} onPress={handleTrackOrderNavigation}>
        <AnimatedDeliveryIcon size={35} backgroundColor='transparent' />
        <ThemedText type='defaultSemiBold' darkColor={firstColor} lightColor={firstColor}>Delivery time:</ThemedText>
        <ThemedText type='subtitle' darkColor={firstColor} lightColor={firstColor}>{deliveryTime.getHours() + ':' + deliveryTime.getMinutes()}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: 'flex-start',
    flexDirection:'row',
    zIndex: 90,
    gap: 5,
    width: '100%',
    borderTopRightRadius:30,
    borderTopLeftRadius:30
  },
});
