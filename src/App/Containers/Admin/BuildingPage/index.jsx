import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Menu, Table, Tag, Image, Typography } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { GlobalOutlined, SettingOutlined } from "@ant-design/icons";
import "./index.scss";
import Header from "./Header";
import { 
  loadBuildings, 
  selectIsLoading, 
  selectListBuilding, 
  selectPageSize, 
  selectTotalCount 
} from "App/Stores/building.slice";

const BuildingPage = () => {
  //#region state includes: [selectedItems: array], [currentPage: int]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  //#endregion
  //#region handle event functions

  const handleRows = (values) => setSelectedItems(values);
  const handlePaging = (number) => {
    dispatch(loadBuildings({ pageIndex: number }));
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadBuildings({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region Store dispatch & selector of [listBuilding, isLoading]
  const dispatch = useDispatch();
  const listBuilding = useSelector(selectListBuilding);
  const isLoading = useSelector(selectIsLoading);
  const pageSize = useSelector(selectPageSize);
  const totalCount = useSelector(selectTotalCount);
  //#endregion

  useEffect(() => {
    dispatch(loadBuildings());
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
              dataSource={listBuilding}
              pagination={{
                size: "small",
                current: currentPage,
                pageSize: pageSize,
                total: totalCount,
                onChange: handlePaging,
              }}
            >
              <Table.Column
                title="Image"
                dataIndex="imageUrl"
                key="imageUrl"
                render={(item) => (
                  <Image 
                    width={140}
                    src={item}
                   />
                )}
              />
              <Table.Column
                title="Building Name"
                dataIndex="name"
                key="name"
                render={(item) => <Typography.Text>{item}</Typography.Text>}
              />

              <Table.Column
                title="Address"
                dataIndex="address"
                key="address"
                width={290}
                render={(item) => (
                  <Typography.Text> {item}</Typography.Text>
                )}
              />
              <Table.Column
                title="Manager Name"
                dataIndex="manager"
                key="manager"
                render={(item) => (
                  <Typography.Text>{item.name}</Typography.Text>
                )}
              />

              <Table.Column
                title="Num.Floor"
                dataIndex="numberOfFloor"
                key="numberOfFloor"
                render={(item) => (
                  <Typography.Text>{item}</Typography.Text>
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
            </Table>
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BuildingPage;
