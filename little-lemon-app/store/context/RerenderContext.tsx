import { createContext } from "react";

type Props = {
  resetPicture: boolean;
  setResetPicture: (arg: any) => any;
  resetCartCounter: boolean;
  setResetResetCartCounter: (arg: any) => any;
  resetTrackOrder: boolean;
  setResetTrackOrder: (arg: any) => any;
};

export const RerenderContext = createContext<Props>({
  resetPicture: false,
  setResetPicture: () => { },
  resetCartCounter: false,
  setResetResetCartCounter: () => { },
  resetTrackOrder: false,
  setResetTrackOrder: () => { },
});
