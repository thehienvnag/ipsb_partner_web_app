import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

const ColumnSearch = ({ clearFilters, placeholder, onSubmit, onCancel }) => {
  const [searchValue, setSearchValue] = useState(null);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleSubmit = () => {
    if (searchValue && searchValue.length) {
      onSubmit(searchValue);
    }
  };
  const handleCancel = () => {
    clearFilters();
    onCancel();
    setSearchValue("");
  };
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={handleSubmit}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 100 }}
        >
          Search
        </Button>
        <Button onClick={handleCancel} size="small">
          Cancel
        </Button>
      </Space>
    </div>
  );
};

export default ColumnSearch;
