import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import StoreTable from "./Contents/StoreTable/index";
import CreateStoreModal from "./Contents/CreateStoreModal";

const StorePage = () => {
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
          <StoreTable />
        </Card>
        <CreateStoreModal visible={visible} handleCancel={handleCancel} />
      </PageBody>
    </PageWrapper>
  );
};
export default StorePage;
