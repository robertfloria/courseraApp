import { Colors } from "@/constants/Colors";
import { useContext } from "react";
import { ThemeContext } from "@/store/context/ThemeContext";
import { Theme } from "@/utils/interfaces";

export function useThemeColor(
  props: Theme,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const { theme } = useContext(ThemeContext);
  const colorFromProps = props[theme as keyof Theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme as keyof Theme][colorName];
  }
}
