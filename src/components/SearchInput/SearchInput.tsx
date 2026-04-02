import { useId, type ChangeEvent, type FC } from "react";
import cls from "./SearchInput.module.css";
import { SearchIcon } from "../icons";

export interface ISearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchInput: FC<ISearchInputProps> = ({ value, onChange, className }) => {
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
