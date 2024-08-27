import { useThemeColor } from "@/hooks/useThemeColor";
import * as React from "react";
import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";
import { ThemedText } from "./ThemedText";

type Props = PressableProps &
  React.PropsWithChildren & {
    lightColor?: string;
    darkColor?: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    textColor?: string;
    fontSize?: number;
  };

const ThemedButton = ({
  style,
  children,
  lightColor,
  darkColor,
  disabled,
  textColor,
  fontSize,
  ...otherProps
}: Props) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "firstColor",
  );

  const [isPressed, setIsPressed] = React.useState(false);

  const color = useThemeColor({}, "text");

  const scaleValue = new Animated.Value(1); // Initial scale value of 1

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.2, // Scale down to 95%
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Return to original size
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={[
        {
          backgroundColor: backgroundColor,
        },
        styles(disabled).buttonWrapper,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...otherProps}
    >
      <Animated.View
        style={[
          {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <ThemedText
          style={{
            color: textColor ?? color,
            fontSize: fontSize ?? 16,
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
          }}
        >
          {children}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
};

const styles = (disabled?: boolean) =>
  StyleSheet.create({
    buttonWrapper: {
      borderRadius: 8,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      textAlign: "center",
      padding: 10,
      opacity: disabled ? 0.5 : 1,
    },
  });

export default ThemedButton;
