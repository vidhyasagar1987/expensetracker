import React from "react";
import "../css/inputfield.css";

const InputField = ({
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  errorMessage,
  required = false,
  label,
  ...rest
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="fixed-label">
      {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`input ${errorMessage ? "input-error" : ""}`}
        {...rest}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
