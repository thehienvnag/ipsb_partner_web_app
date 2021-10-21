import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import LocatorTagTable from "./Contents/LocatorTagTable/index";
import LocatorTagDetails from "./Contents/LocatorTagDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";
const LocatorTagPage = () => {
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
            <LocatorTagTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <LocatorTagDetails
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

export default LocatorTagPage;
