import React from "react";
import "../css/selectfield.css";

const SelectField = ({
  name,
  value,
  onChange,
  onBlur,
  errorMessage,
  required = false,
  label,
  options = [],
  ...rest
}) => {
  return (
    <div className="select-container">
      <label htmlFor={name} className="fixed-label">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`select ${errorMessage ? "select-error" : ""}`}
        {...rest}
      >
        <option disabled value=""  className="disabledStyle">
          -- Select an option --
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default SelectField;
