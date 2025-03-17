import React from "react";
import "../css/global.css";
import Loader from "./Loader";

const GlobalButton = ({
  onClick,
  icon,
  children,
  buttonType,
  disabled,
  type = "button",
  loading = false,
}) => {
  let buttonCss;
  if (buttonType === "primary") {
    buttonCss = "primary";
  } else if (buttonType === "secondary") {
    buttonCss = "secondary";
  } else if (buttonType === "delete") {
    buttonCss = "delete";
  }

  return (
    <button
      className={`button ${buttonCss}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {loading ? <Loader /> : icon && <div>{icon}</div>}
      <span> {children}</span>
    </button>
  );
};

export default GlobalButton;
