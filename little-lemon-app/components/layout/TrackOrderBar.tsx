import { useContext } from "react";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { TrackDeliveryContext } from "@/store/context/TrackDeliveryContext";
import { ThemedView } from "../ThemedView";
import { AnimatedDeliveryIcon } from "../trackOrderScreen/AnimatedDeliveryIcon";
import { ThemedText } from "../ThemedText";
import { WaveSvg } from "../svg/WaveSvg";

export default function TrackOrderBar() {
  const { deliveryTime } = useContext(TrackDeliveryContext);
  const firstColor = useThemeColor({}, "firstColor");
  const secondColor = useThemeColor({}, "secondColor");

  return (
    <ThemedView style={styles.container}>
      <AnimatedDeliveryIcon size={40}/>
      <ThemedText type="subtitle">Delivery time:</ThemedText>
      <ThemedText type="subtitle" darkColor={firstColor} lightColor={firstColor}>{deliveryTime.getHours() + ':' + deliveryTime.getMinutes()}</ThemedText>
      <WaveSvg color={secondColor} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: 'flex-start',
    flexDirection: 'row',
    zIndex: 90,
    gap: 5,
    width:'100%'
  },
  button: {
    padding: 10,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
