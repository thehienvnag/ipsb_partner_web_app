import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";

import FloorPlanTable from "./FloorPlanTable";
import FloorPlanDetail from "./FloorPlanDetail";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";
import { useDispatch } from "react-redux";
import { resetFloorPlan } from "App/Stores/indoorMap.slice";

const FloorPlanPage = () => {
  const dispatch = useDispatch();
  const {
    refresh,
    visible,
    item,
    handleRefresh,
    handleCreate,
    onRowSelect,
    handleCancel,
  } = useRowDetails({rowSelectEffect: () => {
    dispatch(resetFloorPlan());
  }});
  return (
    <PageWrapper>
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <FloorPlanTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <FloorPlanDetail
          visible={visible}
          model={item}
          onCancel={handleCancel}
          handleRefresh={handleRefresh}
          handleCancel={handleCancel}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default FloorPlanPage;
