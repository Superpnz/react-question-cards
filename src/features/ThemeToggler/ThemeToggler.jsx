import { THEME_STORAGE } from "../../constants";
import { useTheme } from "../../hooks/useTheme";
import cls from "./ThemeToggler.module.css";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked;
    const updatedTheme = isChecked ? "light" : "dark";

    setTheme(updatedTheme);
    if (updatedTheme === "dark") {
      document.body.classList.add("darkLayout");
    } else {
      document.body.classList.remove("darkLayout");
    }

    localStorage.setItem(THEME_STORAGE, updatedTheme);
  };

  return (
    <label htmlFor="switch" className={cls.switch}>
      <input id="switch" type="checkbox" onChange={onChangeHandler} checked={theme === "light"} />
      <span className={cls.slider} />
      <span className={cls.decoration} />
    </label>
  );
};
