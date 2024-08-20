import { useThemeColor } from "@/hooks/useThemeColor";
import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

type Props = PressableProps &
  React.PropsWithChildren & {
    lightColor?: string;
    darkColor?: string;
    style?: StyleProp<ViewStyle>;
  };

const ThemedButton = ({
  style,
  children,
  lightColor,
  darkColor,
  ...otherProps
}: Props) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "button",
  );

  const color = useThemeColor({ light: "", dark: "" }, "text");

  return (
    <Pressable
      style={[
        { backgroundColor: backgroundColor },
        styles.buttonWrapper,
        style,
      ]}
      {...otherProps}
    >
      <Text style={[{ color: color }, styles.text]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  disabled: {
    backgroundColor: "grey",
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
  },
});

export default ThemedButton;
