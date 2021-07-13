import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Menu } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { GlobalOutlined } from "@ant-design/icons";
import { loadLocatorTags } from "App/Stores/locatorTag.slice";
import "./index.scss";
import Header from "./Header";
import LocatorTagTable from "./Contents/LocatorTagTable/index";

const LocatorTagPage = () => {
  //#region state includes: [selectedItems: array]
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("overview");
  //#endregion
  //#region handle event functions
  const handleRefresh = () => {
    dispatch(loadLocatorTags({ pageIndex: currentPage }));
  };
  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region load state of locator tags to store
  const dispatch = useDispatch();
  // Init function
  useEffect(() => {
    dispatch(loadLocatorTags({ pageIndex: currentPage }));
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
            {/* <Menu.Item key="places" icon={<CustomerServiceOutlined />}>
              Services
            </Menu.Item> */}
          </Menu>
          <div style={{ padding: 10 }}>
            <MenuChanged
              selectedMenu={selectedMenu}
              locatorTagTable={
                <LocatorTagTable
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
              }
              // places={<ServiceTable />}
            />
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

const MenuChanged = ({ selectedMenu, locatorTagTable, places }) => {
  switch (selectedMenu) {
    // case "places":
    //   return places;
    default:
      return locatorTagTable;
  }
};
export default LocatorTagPage;
