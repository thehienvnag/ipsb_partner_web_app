import React, { useEffect, useState } from "react";
import { Card, Menu, Table, Tag, Image, Typography } from "antd";
import { Link } from "react-router-dom";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { getFloorPlans } from "App/Services/floorPlan.service";
import { GlobalOutlined, SettingOutlined } from "@ant-design/icons";
import "./index.scss";
import Header from "./Header";

const FloorPlanPage = () => {
  const [listFloor, setListFloor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    //#region function fetch data
    const fetchData = async () => {
      setIsLoading(true);
      const floors = await getFloorPlans();
      setIsLoading(false);
      setListFloor(
        floors?.content?.map((item, index) =>
          Object.assign(
            {
              status: index % 2 === 0 ? "Active" : "Inactive",
              key: "col-" + index,
            },
            item
          )
        )
      );
    };
    //#endregion
    fetchData();
  }, []);
  const handleRows = (values) => {
    console.log(values);
    setSelectedItems(values);
  };
  const handlePaging = (number, pageSize) => setCurrentPage(number);
  return (
    <PageWrapper>
      <Header />
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
                pageSize: 5,
                total: listFloor?.content ?? 0,
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
                title="Floor code"
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
                render={(item) => (
                  <Tag color={item === "Active" ? "blue" : "red"}>{item}</Tag>
                )}
              />
              <Table.Column
                title="Image"
                key="imageUrl"
                render={(item) => (
                  <Image
                    className="image-button"
                    width={100}
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
