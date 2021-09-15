import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Input,
  Space,
  Avatar,
  Checkbox,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  loadAccounts,
  selectListAccount,
  selectIsLoading,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/account.slice";
const BuildingManagerTable = ({ currentPage, handlePaging, onRowSelect }) => {
  const dispatch = useDispatch();
  const listAccount = useSelector(selectListAccount);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    dispatch(loadAccounts({ role: "Building Manager" }));
  }, [dispatch]);
  return (
    <Table
      loading={isLoading}
      dataSource={listAccount}
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
        key="buildingManagerIndex"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Image"
        dataIndex="imageUrl"
        key="imageUrl"
        render={(item) => <Avatar src={item} size={40} />}
      />
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search name manager`}
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
        title="Email"
        dataIndex="email"
        key="email"
        width={290}
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search email`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                if (value && value.length) {
                  setSearch({ email: value });
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
        title="Phone"
        dataIndex="phone"
        key="phone"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search phone`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                if (value && value.length) {
                  setSearch({ phone: value });
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
        title="Status"
        dataIndex="status"
        key="status"
        render={(value) => {
          if (!value) {
            value =
              Math.floor(Math.random() * 2) % 2 === 0 ? "Active" : "Inactive";
          }
          return <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>;
        }}
        filterDropdown={() => (
          <div style={{ padding: 8 }}>
            <Space>
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={(e) => {
                  const value = e;
                  if (value && value.length) {
                    setSearch({ status: value });
                  } else {
                    setSearch(null);
                  }
                }}
              >
                <Checkbox value="">All</Checkbox>
                <Checkbox value="New">New</Checkbox>
                <Checkbox value="Active">Active</Checkbox>
                <Checkbox value="Inactive">Inactive</Checkbox>
              </Checkbox.Group>

              {/* <Select
              placeholder="Select Status"
              onChange={(e) => {
                const value = e;
                if (value && value.length) {
                  setSearch({ status: value });
                } else {
                  setSearch(null);
                }
              }}
            >
              <Option value="">All</Option>
              <Option value="New">New</Option>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select> */}

              <Button
                type="primary"
                onClick={() => {
                  handlePaging(1);
                }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 100 }}
              >
                Filter
              </Button>
            </Space>
          </div>
        )}
      />
    </Table>
  );
};

export default BuildingManagerTable;
