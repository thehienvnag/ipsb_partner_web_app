import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Menu } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { GlobalOutlined } from "@ant-design/icons";
import { loadLocatorTags } from "App/Stores/locatorTag.slice";
import "./index.scss";
import Header from "./Header";
import LocatorTagTable from "./Contents/LocatorTagTable/index";
import { selectCurrentFloorPlan } from "App/Stores/floorPlan.slice";
import LocatorTagDetails from "./Contents/LocatorTagDetails";

const LocatorTagPage = () => {
  //#region state includes: []
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [locatorTag, setLocatorTag] = useState(null);
  const currentFloorPlan = useSelector(selectCurrentFloorPlan);
  //#endregion
  //#region handle event functions
  const handleRefresh = () => {
    dispatch(loadLocatorTags({ pageIndex: currentPage }));
  };
  const handleDelete = () => {};
  const handleCreate = () => {
    setVisible(true);
    setLocatorTag(null);
  };
  //#endregion
  //#region load state of locator tags to store
  const dispatch = useDispatch();
  const onRowSelect = (value) => {
    setLocatorTag(value);
    setVisible(true);
  };
  // Init function
  useEffect(() => {
    dispatch(loadLocatorTags({ pageIndex: currentPage }));
  }, [dispatch, currentPage, currentFloorPlan]);
  //#endregion
  return (
    <PageWrapper>
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header
              handleRefresh={handleRefresh}
              handleCreate={handleCreate}
              handleDelete={handleDelete}
            />
            <LocatorTagTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <LocatorTagDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          model={locatorTag}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default LocatorTagPage;
