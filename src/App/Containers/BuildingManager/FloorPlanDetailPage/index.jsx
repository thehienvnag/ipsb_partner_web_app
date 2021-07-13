import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Menu } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { GlobalOutlined } from "@ant-design/icons";
import { GrMapLocation } from "react-icons/gr";
import { FaRoute } from "react-icons/fa";
import { loadById, selectOne } from "App/Stores/floorPlan.slice";
import "./index.scss";
import Header from "./Header";

import { useSelector } from "react-redux";
import ServiceTable from "./Contents/ServiceTable/index";
import RouteDetails from "./Contents/RouteDetails/index";
import Overview from "./Contents/Overview/index";
const FloorPlanDetailPage = ({ match }) => {
  //#region state includes: [selectedItems: array]
  const [selectedMenu, setSelectedMenu] = useState("overview");
  const { id } = useParams();
  //#endregion
  //#region selector of [listFloor, isLoading]
  const floor = useSelector(selectOne);
  //#endregion
  //#region handle event functions
  const handleRefresh = () => {};
  const handleDelete = () => {};
  const handleCreate = () => {};
  //#endregion
  //#region load state of floor plans to store
  const dispatch = useDispatch();
  // Init function
  useEffect(() => {
    dispatch(loadById(id));
  }, [dispatch, id]);
  //#endregion

  return (
    <PageWrapper>
      <Header
        floor={floor}
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
            <Menu.Item key="places" icon={<GrMapLocation />}>
              Places
            </Menu.Item>
            <Menu.Item key="routes" icon={<FaRoute />}>
              Routes
            </Menu.Item>
          </Menu>
          <div style={{ padding: 10 }}>
            <MenuChanged
              selectedMenu={selectedMenu}
              overview={<Overview floor={floor} />}
              places={<ServiceTable />}
              routes={<RouteDetails />}
            />
          </div>
        </Card>
      </PageBody>
    </PageWrapper>
  );
};

const MenuChanged = ({ selectedMenu, overview, places, routes }) => {
  switch (selectedMenu) {
    case "places":
      return places;
    case "routes":
      return routes;
    default:
      return overview;
  }
};

export default FloorPlanDetailPage;
