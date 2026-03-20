import { createContext, useLayoutEffect, useState } from "react";
import { THEME_STORAGE } from "../constants";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE);
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useLayoutEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("darkLayout");
    } else {
      document.body.classList.remove("darkLayout");
    }

    localStorage.setItem(THEME_STORAGE, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
