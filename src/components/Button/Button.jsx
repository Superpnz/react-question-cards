import {} from "react";
import cls from "./Button.module.css";

const inlineStyles = {
  color: "lightsalmon",
  backgroundColor: "#ccc",
};

const isPrimary = false;

export const Button = ({ onClick, children }) => {
  return (
    <button className={`${cls.btn} ${isPrimary ? cls.primary : ""}`} onClick={onClick}>
      {children}
    </button>
  );
};
