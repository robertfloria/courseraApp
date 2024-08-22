import { useThemeColor } from "@/hooks/useThemeColor";
import { Checkbox, CheckboxItemProps } from "react-native-paper";

type ThemedCheckboxProps = CheckboxItemProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedCheckbox({
  lightColor,
  darkColor,
  label,
  labelStyle,
  ...otherProps
}: ThemedCheckboxProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const firstColor = useThemeColor({ light: lightColor, dark: darkColor }, "firstColor");

  return (
    <Checkbox.Item
      color={firstColor}
      label={label}
      labelStyle={[{ color: color }, labelStyle]}
      {...otherProps}
    />
  );
}
