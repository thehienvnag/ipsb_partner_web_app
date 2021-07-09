import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Menu } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { GlobalOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { loadFloorPlans } from "App/Stores/floorPlan.slice";
import "./index.scss";
import Header from "./Header";
import FloorPlanTable from "./Contents/FloorPlanTable/index";
import ServiceTable from "./Contents/ServiceTable/index";

const FloorPlanPage = () => {
  //#region state includes: [selectedItems: array]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("overview");
  //#endregion
  //#region handle event functions
  const handleRefresh = () => {
    setCurrentPage(currentPage);
  };
  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region load state of floor plans to store
  const dispatch = useDispatch();
  // Init function
  useEffect(() => {
    dispatch(loadFloorPlans({ pageIndex: currentPage }));
  }, [dispatch, currentPage]);
  //#endregion
  return (
    <PageWrapper>
      <Header
        handleRefresh={handleRefresh}
        handleCreate={handleCreate}
        handleDelete={handleDelete}
      />
      <PageBody>
        <Card>
          <Menu
            selectedKeys={[selectedMenu]}
            onSelect={(value) => setSelectedMenu(value.key)}
            mode="horizontal"
          >
            <Menu.Item key="overview" icon={<GlobalOutlined />}>
              Overview
            </Menu.Item>
            <Menu.Item key="places" icon={<CustomerServiceOutlined />}>
              Services
            </Menu.Item>
          </Menu>
          <div style={{ padding: 10 }}>
            <MenuChanged
              selectedMenu={selectedMenu}
              floorTable={
                <FloorPlanTable
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              }
              places={<ServiceTable />}
            />
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

const MenuChanged = ({ selectedMenu, floorTable, places }) => {
  switch (selectedMenu) {
    case "places":
      return places;
    default:
      return floorTable;
  }
};
export default FloorPlanPage;
