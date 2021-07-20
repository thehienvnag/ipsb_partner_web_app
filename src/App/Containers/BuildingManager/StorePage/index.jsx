import React, { useState } from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import StoreTable from "./Contents/StoreTable/index";
import CreateStoreModal from "./Contents/CreateStoreModal";

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
      <Header handleCreate={handleCreate} />
      <PageBody>
        <Card>
          <StoreTable onRowClick={onRowClick} call={call} />
        </Card>
        <CreateStoreModal
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
