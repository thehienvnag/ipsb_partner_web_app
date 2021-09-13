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
  loadCoupons,
  selectListCoupon,
  selectIsLoading,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/coupon.slice";
import Moment from "moment";

const ManageCouponTable = ({ currentPage, handlePaging, onRowSelect }) => {
  const dispatch = useDispatch();
  const listCoupon = useSelector(selectListCoupon);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    dispatch(loadCoupons());
  }, [dispatch]);
  return (
    <Table
      loading={isLoading}
      dataSource={listCoupon}
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
        key="couponIndex"
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
              placeholder={`Search coupon name`}
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
        title="Code"
        dataIndex="code"
        key="code"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ selectedKeys }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search coupon code`}
              value={selectedKeys[0]}
              onChange={(e) => {
                const value = e.target.value;
                if (value && value.length) {
                  setSearch({ code: value });
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
        title="Amount"
        dataIndex="amount"
        key="amount"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />
      <Table.Column
        title="Limit"
        dataIndex="limit"
        key="limit"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />
      <Table.Column
        title="PublishDate"
        dataIndex="publishDate"
        key="publishDate"
        render={(item) => <Typography.Text>{Moment(item).format("LLL")}</Typography.Text>}
        
      />
      <Table.Column
        title="ExpireDate"
        dataIndex="expireDate"
        key="expireDate"
        render={(item) => <Typography.Text>{Moment(item).format("LLL")}</Typography.Text>}
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

export default ManageCouponTable;
