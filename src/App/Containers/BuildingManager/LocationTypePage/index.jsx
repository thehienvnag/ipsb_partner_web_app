import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import LocationTypeTable from "./Contents/LocationTypeTable/index";
import CreateLocationTypeModel from "./Contents/CreateLocationTypeModel";

const LocationTypePage = () => {
  const [visible, setVisible] = useState(false);
  const handleCreate = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <PageWrapper>
      <Header handleCreate={handleCreate} />
      <PageBody>
        <Card>
          <LocationTypeTable />
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
