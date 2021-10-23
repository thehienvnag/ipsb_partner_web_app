import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Tag, Typography } from "antd";

import { useQuery } from "App/Utils/hooks/useQuery";
import { useSelector } from "react-redux";
import { selectBuildingId } from "App/Stores/auth.slice";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getAllFacility } from "App/Services/facility.service";

const FacilityTable = ({ refresh, onRowSelect }) => {
  const buildingId = useSelector(selectBuildingId);
  const {
    data,
    loading,
    pageSize,
    totalCount,
    currentPage,
    setSearchParams,
    setPageIndex,
  } = useQuery({
    apiCallback: getAllFacility,
    additionalParams: { buildingId },
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
        key="facility"
        render={(item, record, index) => <Tag>{index + 1}</Tag>}
      />
      <Table.Column
        title="Name"
        dataIndex="name"
        key="name"
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by name"
            clearFilters={clearFilters}
            onSubmit={(value) => setSearchParams({ name: value })}
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
        render={(item) => <Typography.Text>{item}</Typography.Text>}
      />

      <Table.Column
        title="Description"
        dataIndex="description"
        key="description"
        filterDropdown={({ clearFilters }) => (
          <ColumnSearch
            placeholder="Search by description"
            clearFilters={clearFilters}
            onSubmit={(value) => setSearchParams({ description: value })}
            onCancel={() => setSearchParams(null)}
          />
        )}
        filterIcon={<SearchOutlined />}
        render={(item) => <Typography.Text>{item}</Typography.Text>}
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

export default FacilityTable;
