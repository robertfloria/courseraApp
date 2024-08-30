import { createContext } from "react";

type Props = {
  deliveryTime: Date;
  setDeliveryTime: (arg: any) => any;
};

export const TrackDeliveryContext = createContext<Props>({
  deliveryTime: new Date(),
  setDeliveryTime: () => { }
});
