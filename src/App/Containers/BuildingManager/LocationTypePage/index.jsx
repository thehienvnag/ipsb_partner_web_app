import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card, Col } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import PlaceTable from "./Contents/PlaceTable/index";
import PlaceDetails from "./Contents/PlaceDetails";

const PlacePage = () => {
  const [visible, setVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [place, setPlace] = useState(null);
  const handleCreate = () => {
    setVisible(true);
    setPlace(null);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleRefresh = () => {
    setIsRefresh(!isRefresh);
  };
  const onRowSelect = (place) => {
    setVisible(true);
    setPlace(place);
  };
  return (
    <PageWrapper>
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleCreate={handleCreate} handleRefresh={handleRefresh} />
            <PlaceTable isRefresh={isRefresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <PlaceDetails
          visible={visible}
          handleCancel={handleCancel}
          place={place}
        />
      </PageBody>
    </PageWrapper>
  );
};
export default PlacePage;
