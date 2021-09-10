import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { loadAll } from "App/Stores/floorPlan.slice";
import "./index.scss";
import Header from "./Header";
import FloorPlanTable from "./FloorPlanTable/index";
import FloorPlanDetail from "./FloorPlanDetail";
import DetailCard from "App/Components/DetailCard";

const FloorPlanPage = () => {
  //#region state includes: [selectedItems: array]
  const [visible, setVisible] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onRowSelect = (selected) => {
    setVisible(true);
    if (selectedFloor !== selected) {
      setSelectedFloor(selected);
    }
  };

  //#endregion
  //#region handle event functions
  const handleRefresh = () => dispatch(loadAll({ pageIndex: currentPage }));
  const handleDelete = () => {};
  const handleCreate = () => {
    setVisible(true);
    setSelectedFloor(null);
  };
  const onCancel = () => {
    setVisible(false);
    setSelectedFloor(null);
  };
  //#endregion
  //#region load state of floor plans to store
  const dispatch = useDispatch();
  // Init function
  useEffect(() => {
    dispatch(loadAll({ pageIndex: currentPage }));
  }, [dispatch, currentPage]);
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
            <FloorPlanTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <DetailCard
          hasFooter={false}
          visible={visible}
          onCancel={onCancel}
          span={9}
        >
          <FloorPlanDetail floor={selectedFloor} onCancel={onCancel} />
        </DetailCard>
      </PageBody>
    </PageWrapper>
  );
};

export default FloorPlanPage;
