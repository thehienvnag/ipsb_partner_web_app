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
  return (
    <PageWrapper>
      <Header handleCreate={handleCreate} />
      <PageBody>
        <Card>
          <StoreTable onRowClick={onRowClick} />
        </Card>
        <CreateStoreModal
          visible={visible}
          handleCancel={handleCancel}
          store={store}
        />
      </PageBody>
    </PageWrapper>
  );
};
export default StorePage;
