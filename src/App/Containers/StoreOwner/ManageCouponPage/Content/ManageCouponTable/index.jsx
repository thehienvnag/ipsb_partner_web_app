import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Avatar, Table, Tag, Typography } from "antd";

import Moment from "moment";
import { selectStoreId } from "App/Stores/auth.slice";
import { useQuery } from "App/Utils/hooks/useQuery";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getAllCoupon } from "App/Services/coupon.service";
import { inVnd } from "App/Utils/utils";

const ManageCouponTable = ({ refresh, onRowSelect }) => {
  const storeId = useSelector(selectStoreId);
  const {
    data,
    loading,
    pageSize,
    totalCount,
    currentPage,
    setSearchParams,
    setPageIndex,
  } = useQuery({
    apiCallback: getAllCoupon,
    additionalParams: { storeId },
    refresh,
  });
  return (
    <Table
      loading={loading}
      dataSource={data}
      pagination={{
        size: "small",
        current: currentPage,
        pageSize: pageSize,
        total: totalCount,
        onChange: (page) => setPageIndex(page),
      }}
      onRow={(record) => ({
        onClick: () => onRowSelect(record),
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
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by name"
            clearFilters={clearFilters}
            onSubmit={(value) => setSearchParams({ name: value })}
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
      />

      <Table.Column
        title="Code"
        dataIndex="code"
        key="code"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by code"
            clearFilters={clearFilters}
            onSubmit={(value) => setSearchParams({ code: value })}
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
      />
      <Table.Column
        title="Type"
        dataIndex="couponType"
        key="couponType"
        render={(item) => <Typography.Text>{item.name}</Typography.Text>}
      />
      <Table.Column
        title="Amount"
        dataIndex="amount"
        key="amount"
        render={(item, { couponTypeId }) => (
          <Typography.Text>{`- ${couponTypeId == 2 ? inVnd(item) : item} ${
            couponTypeId == 2 ? " đ" : " %"
          }`}</Typography.Text>
        )}
      />

      <Table.Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(value) => {
          return <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>;
        }}
        filterDropdown={
          <ColumnSelect
            onSubmit={(value) => setSearchParams({ status: value })}
          />
        }
      />
    </Table>
  );
};

export default ManageCouponTable;
