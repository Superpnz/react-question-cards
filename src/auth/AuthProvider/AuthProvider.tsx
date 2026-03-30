import { createContext, useState } from "react";
import { type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";
import { AUTH_STORAGE } from "../../constants";

export interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
});

export interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const storedValue = localStorage.getItem(AUTH_STORAGE);
  const isLogin = storedValue ? JSON.parse(storedValue) : false;
  const [isAuth, setIsAuth] = useState<boolean>(isLogin);
  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
};
