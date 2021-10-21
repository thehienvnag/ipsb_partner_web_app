import React, { useEffect, useState } from "react";
import { Select } from "antd";
import "./SelectWrapper.scss";
const SelectWrapper = ({
  mode = "single",
  disabled,
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
  const [innerValue, setInnerValue] = useState([]);
  useEffect(() => {
    const fetchApi = async (searchObject) => {
      setLoading(true);
      setData(await loadData(searchObject));
      setLoading(false);
    };
    if (!data) {
      loadData && fetchApi();
      inputData && setData(inputData);
    }
  }, [data, loadData, inputData, onChange]);

  useEffect(() => {
    if (initialValue) {
      if (mode === "single") {
        setInnerValue([
          {
            key: initialValue[keyIndex],
            label: initialValue[labelIndex],
          },
        ]);
      } else if (mode === "multiple") {
        const innerData = initialValue
          .split(",")
          .map((id) => data?.find((item) => id == item[keyIndex]))
          .filter((e) => e)
          .map((item) => ({ key: item[keyIndex], label: item[labelIndex] }));
        setInnerValue(innerData);
      }
    } else {
      setInnerValue([]);
    }
  }, [initialValue]);

  const handleChange = (values) => {
    if (mode === "single") {
      handleSingle(values);
    } else if (mode === "multiple") {
      handleMultiple(values);
    }
  };
  const handleMultiple = (values) => {
    setInnerValue(values);
    onChange(
      values
        .map(({ key }) => key)
        .join(",")
        .trim()
    );
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
      disabled={disabled}
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
