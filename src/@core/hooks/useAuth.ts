import { useContext } from "react";
import { AuthContext, AuthContextData } from "src/context/AuthContext";

export const useAuth = (): AuthContextData => useContext(AuthContext);