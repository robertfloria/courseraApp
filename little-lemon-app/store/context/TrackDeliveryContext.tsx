import { createContext } from "react";

type Props = {
  delivered: boolean,
  setDelivered: (arg: any) => any;
  deliveryTime: Date | null;
  setDeliveryTime: (arg: any) => any;
};

export const TrackDeliveryContext = createContext<Props>({
  deliveryTime: null,
  setDeliveryTime: () => { },
  delivered: false,
  setDelivered: () => { }
});
