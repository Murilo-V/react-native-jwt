import { createContext } from "react";
import { AuthContextValues } from "../interfaces/authContext";

const AuthContext = createContext<AuthContextValues>({
  cars: [],
} as AuthContextValues);

export default AuthContext;
