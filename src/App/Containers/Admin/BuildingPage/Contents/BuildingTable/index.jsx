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
  Select,
  Checkbox,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  loadBuildings,
  selectIsLoading,
  selectListBuilding,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/building.slice";
import { loadAccounts, selectListAccount } from "App/Stores/account.slice";
import SelectAccount from "App/Components/CustomSelect/SelectAccount";
const { Option } = Select;
const BuildingTable = ({ currentPage, handlePaging, onRowSelect }) => {
  const dispatch = useDispatch();
  const listBuilding = useSelector(selectListBuilding);
  const listAccount = useSelector(selectListAccount);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    dispatch(loadBuildings());
    dispatch(loadAccounts({ isAll: true }));
  }, [dispatch]);
  console.log("=========================");
  console.log(listBuilding);
  return (
    <Table
      loading={isLoading}
      dataSource={listBuilding}
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
        key="buildingIndex"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Image"
        dataIndex="imageUrl"
        key="imageUrl"
        render={(item) => <Avatar src={item} size={40} />}
      />
      <Table.Column
        title="Building Name"
        dataIndex="name"
        key="name"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search buiding name`}
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
        title="Address"
        dataIndex="address"
        key="address"
        width={290}
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search by address`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                if (value && value.length) {
                  setSearch({ address: value });
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
        title="Manager Name"
        dataIndex="manager"
        key="manager"
        render={(item) => <Typography.Text>{item.name}</Typography.Text>}
        filterDropdown={() => (
          <div
            style={{
              padding: 8,
              flexDirection: "column",
              display: "flex",
              rowGap: 10,
            }}
          >
            <SelectAccount role="Building Manager" />
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
          </div>
        )}
        //filterIcon={<SearchOutlined />}
      />
      <Table.Column
        title="Num.Floor"
        dataIndex="numberOfFloor"
        key="numberOfFloor"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
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
                <Checkbox value="Active">Active</Checkbox>
                <Checkbox value="New">New</Checkbox>
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

export default BuildingTable;
