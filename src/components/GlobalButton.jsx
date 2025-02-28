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
  return (
    <button
      className={`button ${buttonType === "primary" ? "primary" : "secondary"}`}
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
