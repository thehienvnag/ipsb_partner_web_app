import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Table,
  Tag,
  Typography,
  Input,
  Space,
  Button,
  Checkbox,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  loadLocationTypes,
  selectListLocationType,
  selectIsLoading,
  selectTotalCount,
  selectPageSize
}
  from "App/Stores/location_type_2.slice";

const LocationTypeTable = ({ currentPage, handlePaging, onRowSelect }) => {
  const dispatch = useDispatch();

  const listLocationType = useSelector(selectListLocationType);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch(loadLocationTypes());
  }, [dispatch]);

  return (
    <Table
      loading={isLoading}
      dataSource={listLocationType}
      pagination={{
        size: "small",
        current: currentPage,
        pageSize: pageSize,
        total: totalCount,
        onChange: (page) => handlePaging(page, search),
      }}
      onRow={(record) => ({
        onClick: (event) => onRowSelect(record),
      })}
    >
      <Table.Column
        title="#No"
        key="locationTypeIndex"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Image"
        dataIndex="imageUrl"
        key="imageUrl"
        // width={150}
        render={(item) => <Avatar src={item} size={50} />}
      />
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        // width={250}
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search LocationType name`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                if (value && value.length) {
                  setSearch({ name: value });
                } else {
                  setSearch(null);
                }
              }}
              onPressEnter={() => handlePaging(1)}
              style={{ marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  handlePaging(1);
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 100 }}
              >
                Search
              </Button>
            </Space>
          </div>
        )}
        filterIcon={<SearchOutlined />}
      />
      <Table.Column
        title="Description"
        dataIndex="description"
        key="description"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />
    </Table>
  );
};

export default LocationTypeTable;
