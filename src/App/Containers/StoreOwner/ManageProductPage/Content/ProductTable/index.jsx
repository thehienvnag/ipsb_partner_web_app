import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Space, Avatar, Checkbox, Table, Tag, Typography } from "antd";

import { inVnd } from "App/Utils/utils";
import { useQuery } from "App/Utils/hooks/useQuery";
import { getAllProduct } from "App/Services/product.service";
import { useSelector } from "react-redux";
import { selectStoreId } from "App/Stores/auth.slice";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";

const ProductTable = ({ refresh, onRowSelect }) => {
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
    apiCallback: getAllProduct,
    additionalParams: { storeId },
    refresh,
  });
  return (
    <Table
      loading={loading}
      dataSource={data}
      pagination={{
        size: "small",
        pageSize: pageSize,
        total: totalCount,
        current: currentPage,
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
        title="Category"
        dataIndex="productCategory"
        key="productCategory"
        render={(item) => <Typography.Text>{item?.name}</Typography.Text>}
      />
      <Table.Column
        title="Price"
        dataIndex="price"
        key="price"
        render={(item) => <Typography.Text>{inVnd(item)}</Typography.Text>}
      />

      <Table.Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(value) => (
          <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>
        )}
        filterDropdown={
          <ColumnSelect
            onSubmit={(value) => setSearchParams({ status: value })}
          />
        }
      />
    </Table>
  );
};

export default ProductTable;
