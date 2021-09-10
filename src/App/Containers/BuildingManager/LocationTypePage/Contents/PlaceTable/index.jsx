import React, { useState, useEffect } from "react";
import { getAllLocation } from "App/Services/location.service";
import { Table, Tag, Avatar, Button, Typography, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const PlaceTable = ({ isRefresh, onRowSelect }) => {
  const [listLocationType, setListLocationType] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApi();
  }, [currentPage, isRefresh]);
  const fetchApi = async (searchValue) => {
    let query = {
      buildingId: 12,
      pageIndex: currentPage,
      locationTypeName: searchValue,
    };
    setLoading(true);
    const data = await getAllLocation(query);
    setTotalCount(data.totalCount);
    setLoading(false);
    setPageSize(data.pageSize);
    setListLocationType(data.content);
  };

  const handleSearch = (value) => {
    if (value) {
      setCurrentPage(1);
      fetchApi(value);
    }
  };

  return (
    <>
      <Table
        onRow={(record) => ({ onClick: (e) => onRowSelect(record) })}
        loading={loading}
        dataSource={listLocationType}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: (value) => setCurrentPage(value),
          showSizeChanger: false,
        }}
      >
        <Table.Column
          title="#No"
          key="id"
          render={(value, record, index) => {
            return <Tag>{index + 1}</Tag>;
          }}
        />
        <Table.Column
          title="Image"
          key="imageUrl"
          render={(value) => {
            return (
              <Avatar
                shape="square"
                size={40}
                src={value.locationType.imageUrl}
              />
            );
          }}
        />
        <Table.Column
          title="Name"
          key="name"
          {...getColumnSearchProps("name", handleSearch)}
          render={(value) => {
            return <Typography.Text>{value.locationType.name}</Typography.Text>;
          }}
        />
        <Table.Column
          title="Status"
          key="status"
          dataIndex="status"
          render={(value) => {
            return (
              <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>
            );
          }}
        />
      </Table>
    </>
  );
};

const getColumnSearchProps = (dataIndex, handleSearch) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys[0])}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
});

export default PlaceTable;
