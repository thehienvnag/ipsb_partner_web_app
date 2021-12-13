import React from "react";
import { Table, Tag, Typography } from "antd";
import Moment from "moment";

import { useSelector } from "react-redux";
import { useQuery } from "App/Utils/hooks/useQuery";
import { selectBuildingId } from "App/Stores/auth.slice";
import ColumnSearch from "App/Components/TableUtils/ColumnSearch";
import ColumnSelect from "App/Components/TableUtils/ColumnSelect";
import { getAll as getAllFloorPlan } from "App/Services/floorPlan.service";

const FloorPlanTable = ({ refresh, onRowSelect }) => {
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
    apiCallback: getAllFloorPlan,
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
          title="#Pos"
          dataIndex="floorNumber"
          key="floorNumber"
          render={(item) => <Tag>{item}</Tag>}
        />

        <Table.Column
          title="Floor code"
          key="floorCode"
          render={(item) => <Typography.Text>{item.floorCode}</Typography.Text>}
        />
        <Table.Column
          title="Map scale"
          dataIndex="mapScale"
          key="mapScale"
          render={(value) => <Typography.Text>1 : {value}</Typography.Text>}
        />
        <Table.Column
          title="Rotation angle"
          dataIndex="rotationAngle"
          key="rotationAngle"
          render={(value) => <Typography.Text>{value}</Typography.Text>}
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

export default FloorPlanTable;
