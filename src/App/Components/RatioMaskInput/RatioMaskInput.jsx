import React from "react";
import InputMask from "react-input-mask";

const RatioMaskInput = ({ onChange, value }) => {
  const handleChange = ({ target: { value } }) => {
    const changeValue = parseInt(value.replace("1 : ", ""));
    if (typeof changeValue === "number") {
      onChange(changeValue);
    }
  };
  return (
    <InputMask
      mask="1 : 999999"
      maskChar=""
      permanents={[0, 1, 2, 3]}
      defaultValue={"1 : " + value}
      onChange={handleChange}
    />
  );
};

export default RatioMaskInput;
