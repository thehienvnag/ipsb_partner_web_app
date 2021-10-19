import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import BuildingTable from "./Contents/BuildingTable";
import BuildingDetails from "./Contents/BuildingDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const BuildingPage = () => {
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
    <PageWrapper>
      <PageBody noWrap={true}>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <BuildingTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <BuildingDetails
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

export default BuildingPage;
