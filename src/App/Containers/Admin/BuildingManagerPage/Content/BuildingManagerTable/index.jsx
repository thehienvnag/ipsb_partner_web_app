import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Table, Tag, Typography } from "antd";
import { useQuery } from "App/Utils/hooks/useQuery";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getBuildingManagers } from "App/Services/account.service";
const BuildingManagerTable = ({ refresh, onRowSelect }) => {
  const {
    data,
    loading,
    pageSize,
    totalCount,
    currentPage,
    setSearchParams,
    setPageIndex,
  } = useQuery({
    apiCallback: getBuildingManagers,
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
        title="Email"
        dataIndex="email"
        key="email"
        width={290}
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by address"
            clearFilters={clearFilters}
            onSubmit={(value) => setSearchParams({ address: value })}
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
      />
      <Table.Column
        title="Phone"
        dataIndex="phone"
        key="phone"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by address"
            clearFilters={clearFilters}
            onSubmit={(value) => setSearchParams({ address: value })}
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
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

export default BuildingManagerTable;
