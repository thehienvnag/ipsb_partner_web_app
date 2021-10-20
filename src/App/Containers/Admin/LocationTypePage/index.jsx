import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import LocationTypeTable from "./Contents/LocationTypeTable";
import LocationTypeDetails from "./Contents/LocationTypeDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const LocationTypePageV2 = () => {
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
            <LocationTypeTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <LocationTypeDetails
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

export default LocationTypePageV2;
