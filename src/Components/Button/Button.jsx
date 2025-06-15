import React from "react";
import Button from "react-bootstrap/Button";

const ButtonComponent = ({ 
  componentFrom,
  title,
  buttonName,
  as,
  className,
  type,
  clickFunction,
  btnDisable
}) => {


  return (
    <button
      as={as}
      type={type}
      className={`btn ${className}`}
      onClick={clickFunction}
      title={title}
      disabled={btnDisable}
    >
      {buttonName}
    </button>
  );
};

export default ButtonComponent;
