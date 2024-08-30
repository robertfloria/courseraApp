import { useContext, useEffect, useState } from "react";
import { TrackDeliveryContext } from "./TrackDeliveryContext";

type Props = {
  children: React.ReactNode;
};

export const TrackDeliveryContextProvider = ({ children }: Props) => {
  const [deliveryTime, setDeliveryTime] = useState<Date | null>(null);
  const [delivered, setDelivered] = useState<boolean>(false);

  useEffect(() => {
    if (deliveryTime) {
      const interval = setInterval(() => {
        const currentDate = new Date();
        if (deliveryTime <= currentDate) { setDelivered(true); }
      }, 60000);

      if (delivered) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [delivered])

  return (
    <TrackDeliveryContext.Provider
      value={{
        deliveryTime: deliveryTime,
        setDeliveryTime: setDeliveryTime,
        delivered: delivered,
        setDelivered: setDelivered
      }}
    >
      {children}
    </TrackDeliveryContext.Provider>
  );
};
