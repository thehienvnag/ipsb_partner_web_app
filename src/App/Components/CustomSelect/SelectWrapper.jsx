import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "./SelectWrapper.scss";
const SelectWrapper = ({
  mode = "single",
  initialValue,
  onChange,
  placeholder,
  loadData,
  inputData,
  labelIndex,
  keyIndex,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstInitial, setFirstInitial] = useState(true);
  const [innerValue, setInnerValue] = useState([]);
  useEffect(() => {
    console.log("render");
    const fetchApi = async (searchObject) => {
      setLoading(true);
      setData(await loadData(searchObject));
      setLoading(false);
    };
    if (!data) {
      loadData && fetchApi();
      inputData && setData(inputData);
    }

    if (initialValue) {
      setInnerValue([
        {
          key: initialValue[keyIndex],
          label: initialValue[labelIndex],
        },
      ]);
      // setFirstInitial(false);
    } else {
      setInnerValue([]);
    }
  }, [data, loadData, inputData, onChange]);

  const handleChange = (values) => {
    if (mode === "single") {
      handleSingle(values);
    } else if (mode === "multiple") {
      handleMultiple(values);
    }
  };
  const handleMultiple = (values) => {
    if (values) {
      setInnerValue(values);
      onChange(values.map(({ key }) => key).join(","));
    }
  };
  const handleSingle = (values) => {
    const value = values[values.length - 1];
    if (value) {
      setInnerValue([value]);
      onChange(value.key);
    } else {
      setInnerValue([]);
      onChange(null);
    }
  };

  return (
    <Select
      className={mode === "single" ? "single" : "multiple"}
      labelInValue
      mode="multiple"
      onChange={handleChange}
      value={innerValue}
      placeholder={placeholder}
      loading={loading}
    >
      {data &&
        data.map((item) => {
          return (
            <Select.Option key={item[keyIndex]}>
              {item[labelIndex]}
            </Select.Option>
          );
        })}
    </Select>
  );
};

export default SelectWrapper;
