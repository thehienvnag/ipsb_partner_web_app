import React, { useState } from "react";
import { Button, Space, Checkbox } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const ColumnSelect = ({
  onSubmit,
  checkboxes = ["All", "Active", "Inactive"],
}) => {
  const [searchValue, setSearchValue] = useState(null);
  const handleChange = (values) => {
    if (
      !values.length ||
      values.includes("") ||
      (values.includes("Active") && values.includes("Inactive"))
    ) {
      setSearchValue(null);
    } else {
      setSearchValue(values[0]);
    }
  };
  const handleSubmit = () => onSubmit(searchValue);

  return (
    <div style={{ padding: 8 }}>
      <Space>
        <Checkbox.Group
          style={{ width: "100%" }}
          defaultValue={["Active"]}
          onChange={handleChange}
        >
          {checkboxes.map((item, i) => (
            <Checkbox key={i} value={item === "All" ? "" : item}>
              {item}
            </Checkbox>
          ))}
        </Checkbox.Group>
        <Button
          type="primary"
          onClick={handleSubmit}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 100 }}
        >
          Filter
        </Button>
      </Space>
    </div>
  );
};

export default ColumnSelect;
