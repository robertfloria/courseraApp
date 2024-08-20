import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "thirdColor",
  );

  return (
    <View
      style={[{ backgroundColor: backgroundColor }, style]}
      {...otherProps}
    />
  );
}
