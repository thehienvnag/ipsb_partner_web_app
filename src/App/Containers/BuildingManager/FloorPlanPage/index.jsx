import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Menu, Table, Tag, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import {
  selectIsLoading,
  selectListFloor,
  selectPageSize,
  selectTotalCount,
  loadFloorPlans,
} from "App/Stores/floorPlan.slice";
import { GlobalOutlined, SettingOutlined } from "@ant-design/icons";
import "./index.scss";
import Header from "./Header";

const FloorPlanPage = () => {
  //#region state includes: [selectedItems: array], [currentPage: int]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //#endregion
  //#region handle event functions
  const handleRows = (values) => setSelectedItems(values);
  const handlePaging = (number) => {
    dispatch(loadFloorPlans({ pageIndex: number }));
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadFloorPlans({ pageIndex: currentPage }));
  };
  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region Store dispatch & selector of [listFloor, isLoading]
  const dispatch = useDispatch();
  const listFloor = useSelector(selectListFloor);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  //#endregion

  useEffect(() => {
    dispatch(loadFloorPlans());
  }, [dispatch]);
  return (
    <PageWrapper>
      <Header
        handleRefresh={handleRefresh}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
      <PageBody>
        <Card>
          <Menu defaultSelectedKeys={["mail"]} mode="horizontal">
            <Menu.Item key="mail" icon={<GlobalOutlined />}>
              Overview
            </Menu.Item>
            <Menu.Item key="app" icon={<SettingOutlined />}>
              Settings
            </Menu.Item>
          </Menu>
          <div style={{ padding: 10 }}>
            <Table
              loading={isLoading}
              rowSelection={{
                selectedRowKeys: selectedItems,
                onChange: handleRows,
              }}
              dataSource={listFloor}
              pagination={{
                size: "small",
                current: currentPage,
                pageSize: pageSize,
                total: totalCount,
                onChange: handlePaging,
              }}
            >
              <Table.Column
                title="Position"
                dataIndex="floorNumber"
                key="floorNumber"
                render={(item) => <Typography.Text>#{item}</Typography.Text>}
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
                    {Math.floor(Math.random() * 2) % 2 === 0
                      ? "Basement"
                      : "Ground"}
                  </Typography.Text>
                )}
              />

              <Table.Column
                title="Create date"
                dataIndex="createDate"
                key="createDate"
                render={(item) => (
                  <Typography.Text>June 13th, 2021</Typography.Text>
                )}
              />
              <Table.Column
                title="Status"
                dataIndex="status"
                key="status"
                render={(value) => {
                  if (!value) {
                    value =
                      Math.floor(Math.random() * 2) % 2 === 0
                        ? "Active"
                        : "Inactive";
                  }
                  return (
                    <Tag color={value === "Active" ? "blue" : "red"}>
                      {value}
                    </Tag>
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
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default FloorPlanPage;
