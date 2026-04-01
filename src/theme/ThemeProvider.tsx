import { createContext, useLayoutEffect, useState } from "react";
import { THEME_STORAGE } from "../constants/global.constants";
import type { FC, ReactNode } from "react";
import type { IThemeContext } from "../types/global.types";
import { THEME_ENUM } from "../types/global.enums";

export const ThemeContext = createContext<IThemeContext>({
  theme: THEME_ENUM.DARK,
  setTheme: () => {},
});

export interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<THEME_ENUM>(() => {
    const saved = localStorage.getItem(THEME_STORAGE);
    if (Object.values(THEME_ENUM).includes(saved as THEME_ENUM)) {
      return saved as THEME_ENUM;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;
  });

  useLayoutEffect(() => {
    if (theme === THEME_ENUM.DARK) {
      document.body.classList.add("darkLayout");
    } else {
      document.body.classList.remove("darkLayout");
    }

    localStorage.setItem(THEME_STORAGE, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
