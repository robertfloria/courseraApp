import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputPlaceholder",
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBorder",
  );

  return (
    <TextInput
      style={[
        {
          backgroundColor: backgroundColor,
          color: color,
          borderColor: borderColor,
        },
        styles.input,
        style,
      ]}
      placeholderTextColor={placeholderColor}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
  },
});
