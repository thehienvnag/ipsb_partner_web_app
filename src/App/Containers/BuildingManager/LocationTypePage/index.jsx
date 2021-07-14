import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import LocationTypeTable from "./Contents/LocationTypeTable/index";

// import CreateStoreModal from "./Contents/CreateStoreModal";

const LocationTypePage = () => {
  //   const [visible, setVisible] = useState(false);
  //   const handleCreate = () => {
  //     setVisible(true);
  //   };

  return (
    <PageWrapper>
      <Header
      //   handleCreate={handleCreate}
      />
      <PageBody>
        <Card>
          <LocationTypeTable />
        </Card>
      </PageBody>
    </PageWrapper>
  );
};
export default LocationTypePage;
