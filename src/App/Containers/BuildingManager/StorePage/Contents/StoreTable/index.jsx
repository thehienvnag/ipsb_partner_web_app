import React from "react";
import { Avatar, Table, Tag, Typography } from "antd";

import { useQuery } from "App/Utils/hooks/useQuery";
import { useSelector } from "react-redux";
import { selectBuildingId } from "App/Stores/auth.slice";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getAllStore } from "App/Services/store.service";

const StoreTable = ({ refresh, onRowSelect }) => {
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
    apiCallback: getAllStore,
    additionalParams: { buildingId },
    refresh,
  });

  return (
    <>
      <Table
        dataSource={data}
        loading={loading}
        onRow={(record) => ({
          onClick: (evt) => onRowSelect(record),
        })}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: (value) => setPageIndex(value),
          showSizeChanger: false,
        }}
      >
        <Table.Column
          title="#No"
          key="id"
          render={(value, record, index) => {
            return <Tag>{index + 1}</Tag>;
          }}
        />
        <Table.Column
          title="Image"
          key="imageUrl"
          dataIndex="imageUrl"
          render={(value) => {
            return <Avatar size={40} src={value} />;
          }}
        />
        <Table.Column
          title="Name"
          key="name"
          dataIndex="name"
          filterDropdown={({ clearFilters }) => (
            <ColumnSearch
              placeholder="Search by name"
              clearFilters={clearFilters}
              onSubmit={(value) => setSearchParams({ name: value })}
              onCancel={() => setSearchParams(null)}
            />
          )}
        />
        <Table.Column title="Phone" key="phone" dataIndex="phone" />
        <Table.Column
          title="Floor Plan"
          key="floorPlan"
          render={(value) => (
            <Typography.Text>Floor {value.floorPlan?.floorCode}</Typography.Text>
          )}
        />
        <Table.Column
          title="Store owner"
          key="storeOwner"
          render={(value) => {
            return <Typography.Text>{value.account?.name}</Typography.Text>;
          }}
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
    </>
  );
};

export default StoreTable;
