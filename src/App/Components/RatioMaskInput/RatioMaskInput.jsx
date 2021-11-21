import React from "react";
import { Input } from "antd";
import { isNumber } from "App/Utils/utils";

const RatioMaskInput = ({ onChange, value }) => {
  const handleChange = ({ target: { value: val } }) => {
    if (val !== "1 :") {
      const inputVal = val.replace("1 : ", "");
      if (isNumber(inputVal)) {
        onChange(inputVal);
      }
    }
  };
  return <Input value={`1 : ${value ?? ""}`} onChange={handleChange} />;
};

export default RatioMaskInput;
