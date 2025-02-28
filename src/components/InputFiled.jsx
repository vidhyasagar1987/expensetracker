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
  select,
  options = [],
  ...rest
}) => {
  return (
    <div className="input-container">
      <label
        htmlFor={name}
        className={`fixed-label ${errorMessage ? "input-error" : ""}`}
      >
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      {select ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`input ${errorMessage ? "input-error" : ""}`}
          {...rest}
        >
          <option disabled value="">
            -- Select an option --
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
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
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
