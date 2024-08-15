import { Authentication } from "@/utils/interfaces";
import { createContext } from "react";

export const AuthenticationContext = createContext<Authentication>({
  firstName: "",
  email: "",
});
