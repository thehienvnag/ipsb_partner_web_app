import React from "react";
import { Avatar, Table, Tag, Typography } from "antd";
import { useQuery } from "App/Utils/hooks/useQuery";
import { SearchOutlined } from "@ant-design/icons";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getBuildings } from "App/Services/building.service";
import { truncate } from "App/Utils/utils";
const BuildingTable = ({ refresh, onRowSelect }) => {
  const {
    data,
    loading,
    pageSize,
    totalCount,
    currentPage,
    setSearchParams,
    setPageIndex,
  } = useQuery({
    apiCallback: getBuildings,
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
        title="Address"
        dataIndex="address"
        key="address"
        width={290}
        render={(item) => (
          <Typography.Text>{truncate(item, 30)}</Typography.Text>
        )}
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
        title="Manager Name"
        dataIndex="manager"
        key="manager"
        render={(item) => <Typography.Text>{item.name}</Typography.Text>}
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by building manager name"
            clearFilters={clearFilters}
            onSubmit={(value) =>
              setSearchParams({ buildingManagerName: value })
            }
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
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

export default BuildingTable;
