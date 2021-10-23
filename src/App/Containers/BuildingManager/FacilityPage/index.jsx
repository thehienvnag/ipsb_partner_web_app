import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import Header from "./Header";
import "./index.scss";

import FacilityTable from "./Contents/FacilityTable";
import FacilityDetails from "./Contents/FacilityDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const FacilityPage = () => {
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
    <PageWrapper className="facility-page">
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <FacilityTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <FacilityDetails
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

export default FacilityPage;
