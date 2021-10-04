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
  loadCouponTypes,
  selectListCouponType,
  selectIsLoading,
  selectTotalCount,
  selectPageSize
}
  from "App/Stores/couponType.slice";
import { truncate } from "App/Utils/utils";

const CouponTypeTable = ({ currentPage, handlePaging, onRowSelect }) => {
  const dispatch = useDispatch();

  const listCouponType = useSelector(selectListCouponType);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    dispatch(loadCouponTypes());
  }, [dispatch]);

  return (
    <Table
      loading={isLoading}
      dataSource={listCouponType}
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
        key="couponTypeIndex"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search CouponType name`}
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
        width={290}
        render={(item) => <Typography.Text>{truncate(item,80)}</Typography.Text>}
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

export default CouponTypeTable;
