import { Authentication } from "@/utils/interfaces";
import { createContext } from "react";

type HeaderContextProps = {
  resetPicture: boolean;
  setResetPicture: (arg: any) => any;
  resetCartCounter: boolean;
  setResetResetCartCounter: (arg: any) => any;
};

export const HeaderContext = createContext<HeaderContextProps>({
  resetPicture: false,
  setResetPicture: () => {},
  resetCartCounter: false,
  setResetResetCartCounter: () => {},
});
