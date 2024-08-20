import { ThemeType } from "@/constants/ThemeType";
import { createContext } from "react";

type Props = {
  theme: ThemeType.light | ThemeType.dark;
  setTheme: (arg: any) => any;
};

export const ThemeContext = createContext<Props>({
  theme: ThemeType.light,
  setTheme: () => {},
});
