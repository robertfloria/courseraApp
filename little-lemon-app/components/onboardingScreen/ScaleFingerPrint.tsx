import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";

export function ScaleFingerPrint() {
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    // Function to create the pulsing effect every 5 seconds
    const interval = setInterval(() => {
      scaleAnimation.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 200 }), // Scale up
          withTiming(1, { duration: 200 }), // Scale back down
        ),
        2, // Repeat the pulsing animation 4 times
        true, // Reverse the animation for a smoother pulse
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [scaleAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnimation.value }], // Apply the scale transformation
  }));

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={animatedStyle}>
        <MaterialIcons name="fingerprint" size={50} color="orange" />
      </Animated.View>
      <ThemedText style={{ fontSize: 40, lineHeight: 40 }}>Login</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
});
