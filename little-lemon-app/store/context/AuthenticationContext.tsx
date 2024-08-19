import { createContext } from "react";

type AuthenticationContextProps = {
  firstName: string;
  email: string;
  setAuthentication: (arg: any) => any;
};

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  firstName: "",
  email: "",
  setAuthentication: () => {},
});
