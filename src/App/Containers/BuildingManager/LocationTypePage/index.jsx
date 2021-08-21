import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import LocationTypeTable from "./Contents/LocationTypeTable/index";
import CreateLocationTypeModel from "./Contents/CreateLocationTypeModel";

const LocationTypePage = () => {
  const [visible, setVisible] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const handleCreate = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleRefresh = () => {
    setIsRefresh(!isRefresh);
  };
  return (
    <PageWrapper>
      <Header handleCreate={handleCreate} handleRefresh={handleRefresh} />
      <PageBody>
        <Card>
          <LocationTypeTable isRefresh={isRefresh} />
        </Card>
        <CreateLocationTypeModel
          visible={visible}
          handleCancel={handleCancel}
        />
      </PageBody>
    </PageWrapper>
  );
};
export default LocationTypePage;
