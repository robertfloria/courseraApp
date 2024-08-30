import { useState } from "react";
import { TrackDeliveryContext } from "./TrackDeliveryContext";

type Props = {
  children: React.ReactNode;
};

export const TrackDeliveryContextProvider = ({ children }: Props) => {
  const [deliveryTime, setDeliveryTime] = useState<Date>(new Date());

  return (
    <TrackDeliveryContext.Provider
      value={{
        deliveryTime: deliveryTime,
        setDeliveryTime: setDeliveryTime
      }}
    >
      {children}
    </TrackDeliveryContext.Provider>
  );
};
