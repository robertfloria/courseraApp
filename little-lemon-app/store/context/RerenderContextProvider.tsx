import { useState } from "react";
import { RerenderContext } from "./RerenderContext";

type Props = {
  children: React.ReactNode;
};

export const RerenderContextProvider = ({ children }: Props) => {
  const [resetPicture, setResetPicture] = useState<boolean>(false);
  const [resetCartCounter, setResetResetCartCounter] = useState<boolean>(false);

  return (
    <RerenderContext.Provider
      value={{
        resetPicture: resetPicture,
        setResetPicture: setResetPicture,
        resetCartCounter: resetCartCounter,
        setResetResetCartCounter: setResetResetCartCounter,
      }}
    >
      {children}
    </RerenderContext.Provider>
  );
};