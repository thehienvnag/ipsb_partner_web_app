import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import Header from "./Header";
import "./index.scss";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";
import StoreOwnerTable from "./Contents/StoreOwnerTable";
import StoreOwnerDetails from "./Contents/StoreOwnerDetails";

const StoreOwnerPage = () => {
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
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <StoreOwnerTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <StoreOwnerDetails
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

export default StoreOwnerPage;
