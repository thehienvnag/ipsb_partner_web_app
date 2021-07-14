import React from "react";
import { Table, Tag, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import {
  selectIsLoading,
  selectListFloor,
  selectPageSize,
  selectTotalCount,
} from "App/Stores/floorPlan.slice";
import { useSelector } from "react-redux";

const FloorPlanTable = ({
  selectedItems,
  setSelectedItems,
  currentPage,
  setCurrentPage,
}) => {
  //#region selector of [listFloor, isLoading]
  const listFloor = useSelector(selectListFloor);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  //#endregion

  return (
    <>
      <Table
        loading={isLoading}
        rowSelection={{
          selectedRowKeys: selectedItems,
          onChange: (values) => setSelectedItems(values),
        }}
        dataSource={listFloor}
        pagination={{
          size: "small",
          current: currentPage,
          pageSize: pageSize,
          total: totalCount,
          onChange: (value) => setCurrentPage(value),
        }}
      >
        <Table.Column
          title="Position"
          dataIndex="floorNumber"
          key="floorNumber"
          render={(item) => <Tag># {item}</Tag>}
        />

        <Table.Column
          title="Floor"
          key="floorCode"
          render={(item) => (
            <Link to={`${item.id}`}>Tầng {item.floorCode}</Link>
          )}
        />
        <Table.Column
          title="Floor type"
          dataIndex="floorType"
          key="floorType"
          render={(item) => (
            <Typography.Text>
              {Math.floor(Math.random() * 2) % 2 === 0 ? "Basement" : "Ground"}
            </Typography.Text>
          )}
        />
        <Table.Column
          title="Create date"
          dataIndex="createDate"
          key="createDate"
          render={(item) => <Typography.Text>June 13th, 2021</Typography.Text>}
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
            return (
              <Tag color={value === "Active" ? "blue" : "red"}>{value}</Tag>
            );
          }}
        />
        <Table.Column
          title="Image"
          key="imageUrl"
          render={(item) => (
            <Image
              className="image-button"
              width={80}
              src={item.imageUrl}
              preview={{ mask: "View image" }}
            />
          )}
        />
      </Table>
    </>
  );
};

export default FloorPlanTable;
