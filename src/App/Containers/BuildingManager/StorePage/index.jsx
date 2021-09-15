import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card, Col } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import StoreTable from "./Contents/StoreTable/index";
import StoreDetails from "./Contents/StoreDetails";

const StorePage = () => {
  const [visible, setVisible] = useState(false);
  const [store, setStore] = useState(null);
  const [call, setCall] = useState(0);
  const handleCreate = () => {
    setVisible(true);
    setStore(null);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onRowClick = (store) => {
    setStore(store);
    setVisible(true);
  };
  const handleRefresh = () => {
    setCall(call + 1);
  };

  return (
    <PageWrapper>
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleCreate={handleCreate} />
            <StoreTable onRowClick={onRowClick} call={call} />
          </Card>
        </Col>
        <StoreDetails
          visible={visible}
          handleCancel={handleCancel}
          store={store}
          handleRefresh={handleRefresh}
        />
      </PageBody>
    </PageWrapper>
  );
};
export default StorePage;
