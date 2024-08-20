import { ThemeType } from "@/constants/ThemeType";
import { createContext } from "react";

type Props = {
    theme: string,
    setTheme: (arg: any) => any
}
export const ThemeContext = createContext<Props>({
    theme: ThemeType.light,
    setTheme: () => { }
});
