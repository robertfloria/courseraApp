import { useState } from "react";
import { HeaderContext } from "./HeaderContext";

type Props = {
    children: React.ReactNode;
};

export const HeaderContextProvider = ({ children }: Props) => {
    const [resetPicture, setResetPicture] = useState<boolean>(false);
    const [resetCartCounter, setResetResetCartCounter] = useState<boolean>(false);

    return (
        <HeaderContext.Provider value={{
            resetPicture: resetPicture,
            setResetPicture: setResetPicture,
            resetCartCounter: resetCartCounter,
            setResetResetCartCounter: setResetResetCartCounter,
        }}>{children}</HeaderContext.Provider>
    )
};
