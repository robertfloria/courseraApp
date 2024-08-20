import { useThemeColor } from "@/hooks/useThemeColor";
import { Searchbar, SearchbarProps } from "react-native-paper";

type ThemedSearchBarProps = SearchbarProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSearchBar({
  style,
  inputStyle,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedSearchBarProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text",
  );

  return (
    <Searchbar
      style={[{ backgroundColor: backgroundColor }, style]}
      inputStyle={[{ color: color }, inputStyle]}
      iconColor={color}
      placeholderTextColor={color}
      elevation={0}
      {...otherProps}
    />
  );
};
