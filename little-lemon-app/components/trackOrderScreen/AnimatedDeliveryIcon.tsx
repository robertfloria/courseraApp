import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export function AnimatedDeliveryIcon() {
  const translateX = useSharedValue(0);
  const secondColor = useThemeColor({}, 'secondColor');

  useEffect(() => {
    // Function to create the left-right bump effect every 3 seconds
    const interval = setInterval(() => {
      translateX.value = withRepeat(
        withSequence(
          withTiming(20, { duration: 200 }),  // Move right
          withTiming(-20, { duration: 200 }), // Move left, passing the starting point
          withTiming(10, { duration: 150 }),  // Slight right again (overshoot)
          withTiming(0, { duration: 150 })    // Back to the original position
        ),
        2, // Repeat the movement twice
        true // Reverse the animation for a smoother effect
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }], // Apply the horizontal translation
  }));

  return (
    <ThemedView style={[{ backgroundColor: secondColor }, styles.container]}>
      <Animated.View style={animatedStyle}>
        <MaterialIcons name="delivery-dining" size={120} color={Colors.light.text} />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
    borderRadius: 100
  },
});
