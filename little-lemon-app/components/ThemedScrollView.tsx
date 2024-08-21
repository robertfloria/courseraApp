import {
  ScrollView,
  ScrollViewProps,
  View,
  type ViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedScrollView({
  contentContainerStyle,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "thirdColor",
  );

  return (
    <ScrollView
      contentContainerStyle={[
        { backgroundColor: backgroundColor },
        contentContainerStyle,
      ]}
      {...otherProps}
    />
  );
}
