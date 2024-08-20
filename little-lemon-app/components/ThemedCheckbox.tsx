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

  return (
    <Checkbox.Item
      color={color}
      label={label}
      labelStyle={[{ color: color }, labelStyle]}
      {...otherProps}
    />
  );
}
