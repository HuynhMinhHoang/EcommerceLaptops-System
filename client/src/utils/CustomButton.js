import React from "react";
import "./CustomButton.scss";
import { ImSpinner2 } from "react-icons/im";

const CustomButton = ({ text, isLoading, onClick, disabled }) => {
  return (
    <button className="btn-custom" onClick={onClick} disabled={disabled}>
      {isLoading && <ImSpinner2 className="loaderIcon" />}
      {text}
    </button>
  );
};

export default CustomButton;
