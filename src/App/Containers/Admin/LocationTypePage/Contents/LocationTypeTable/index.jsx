import React from "react";
import { Avatar, Table, Tag, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "App/Utils/hooks/useQuery";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getAllLocationType } from "App/Services/locationType.service";

const LocationTypeTable = ({ refresh, onRowSelect }) => {
  const {
    data,
    loading,
    pageSize,
    totalCount,
    currentPage,
    setSearchParams,
    setPageIndex,
  } = useQuery({
    apiCallback: getAllLocationType,
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
        key="locationTypeIndex"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Image"
        dataIndex="imageUrl"
        key="imageUrl"
        render={(item) => <Avatar src={item} size={50} />}
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
        title="Description"
        dataIndex="description"
        key="description"
        render={(item) => <Typography.Text>{item}</Typography.Text>}
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
            checkboxes={["All", "Active", "Inactive"]}
          />
        }
      />
    </Table>
  );
};

export default LocationTypeTable;
