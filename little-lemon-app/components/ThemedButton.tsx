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
    disabled?: boolean
  };

const ThemedButton = ({
  style,
  children,
  lightColor,
  darkColor,
  disabled,
  ...otherProps
}: Props) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "firstColor",
  );

  const color = useThemeColor({ light: "", dark: "" }, "text");

  return (
    <Pressable
      style={[
        { backgroundColor: backgroundColor },
        styles(disabled).buttonWrapper,
        style,
      ]}
      {...otherProps}
    >
      <Text style={[{ color: color }, styles().text]}>{children}</Text>
    </Pressable>
  );
};

const styles = (disabled?: boolean) => StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    opacity: disabled ? 0.5 : 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default ThemedButton;
