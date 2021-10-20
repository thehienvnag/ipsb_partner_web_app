import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import BuildingManagerTable from "./Content/BuildingManagerTable";
import BuildingManagerDetails from "./Content/BuildingManagerDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const BuildingManagerPage = () => {
  const {
    refresh,
    visible,
    item,
    handleRefresh,
    handleCreate,
    onRowSelect,
    handleCancel,
  } = useRowDetails();
  return (
    <PageWrapper className="building-page">
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <BuildingManagerTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <BuildingManagerDetails
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

export default BuildingManagerPage;
