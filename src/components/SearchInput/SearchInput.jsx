import { useId } from "react";
import cls from "./SearchInput.module.css";
import { SearchIcon } from "../icons";

export const SearchInput = ({ value, onChange, className }) => {
  const inputId = useId();
  return (
    <div className={`${cls.inputContainer} ${className || ""}`}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.searchIcon} />
      </label>
      <input
        autoComplete="off"
        type="text"
        id={inputId}
        className={cls.input}
        placeholder="search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
