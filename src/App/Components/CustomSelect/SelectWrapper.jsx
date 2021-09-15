import React, { useEffect, useState } from "react";
import { Select } from "antd";
const SelectWrapper = ({
  value,
  onChange,
  placeholder,
  loadData,
  inputData,
  labelIndex,
  keyIndex,
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [innerValue, setInnerValue] = useState(null);
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
    if (value) {
      const values = value.split(",");
      if (values?.length === 2) {
        setInnerValue({ key: values[0], label: values[1] });
        onChange(values[0]);
      }
    }
  }, [data, loadData, inputData, value, onChange]);

  const handleChange = (value) => {
    onChange(value.key);
    setInnerValue(value);
  };
  return (
    <Select
      style={{ minWidth: 150 }}
      labelInValue
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
