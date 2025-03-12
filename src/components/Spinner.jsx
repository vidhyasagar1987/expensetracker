import React from "react";
import { ClockLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="loader-container">
    <ClockLoader color="#ff7f11" size={40} />
  </div>
  );
};

export default Spinner;
