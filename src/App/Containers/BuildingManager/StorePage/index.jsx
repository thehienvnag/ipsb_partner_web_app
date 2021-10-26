import React from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card, Col } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";

import StoreTable from "./Contents/StoreTable";
import StoreDetails from "./Contents/StoreDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const StorePage = () => {
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
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <StoreTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <StoreDetails
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
export default StorePage;
