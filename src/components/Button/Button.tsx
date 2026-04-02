import type { FC, MouseEvent, ReactNode } from "react";
import cls from "./Button.module.css";

export interface IButtonProps {
  children: ReactNode;
  isDisabled?: boolean;
  isActive?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export const Button: FC<IButtonProps> = ({ onClick, isActive, isDisabled = false, children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};
