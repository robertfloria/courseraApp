import { useThemeColor } from "@/hooks/useThemeColor";
import * as React from "react";
import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
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

  const color = useThemeColor(
    {},
    "text",
  );
  
  console.log(textColor)
  return (
    <Pressable
      style={[
        { backgroundColor: backgroundColor },
        styles(disabled).buttonWrapper,
        style,
      ]}
      {...otherProps}
    >
      <ThemedText style={{ color: textColor ?? color, fontSize: fontSize ?? 16, fontWeight: 'bold' }}>
        {children}
      </ThemedText>
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
      alignItems: "center",
      padding: 10,
      opacity: disabled ? 0.5 : 1,
    },
  });

export default ThemedButton;
