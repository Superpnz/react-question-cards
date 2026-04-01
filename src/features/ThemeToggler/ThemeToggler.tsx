import type { ChangeEvent } from "react";
import { THEME_STORAGE } from "../../constants/global.constants";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";
import { THEME_ENUM } from "../../types/global.enums";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    const updatedTheme = isChecked ? THEME_ENUM.LIGHT : THEME_ENUM.DARK;

    setTheme(updatedTheme);
    if (updatedTheme === THEME_ENUM.DARK) {
      document.body.classList.add("darkLayout");
    } else {
      document.body.classList.remove("darkLayout");
    }

    localStorage.setItem(THEME_STORAGE, updatedTheme);
  };

  return (
    <label htmlFor="switch" className={cls.switch}>
      <input id="switch" type="checkbox" onChange={onChangeHandler} checked={theme === THEME_ENUM.LIGHT} />
      <span className={cls.slider} />
      <span className={cls.decoration} />
    </label>
  );
};
