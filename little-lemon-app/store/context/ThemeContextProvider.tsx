import { ReactNode, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { ThemeType } from "@/constants/ThemeType";
import { useColorScheme } from "react-native";
import { useUpdateEffect } from "@/hooks/useUpdateEffect";

type Props = {
  children: ReactNode;
};

export const ThemeContextProvider = ({ children }: Props) => {
  const deviceTheme = (useColorScheme() as ThemeType) ?? ThemeType.light;

  const [theme, setTheme] = useState<ThemeType>(deviceTheme);

  useUpdateEffect(() => {
    setTheme(deviceTheme);
  }, [deviceTheme]);

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
