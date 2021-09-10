import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import Header from "./Header";
import "./index.scss";
import { loadAccounts } from "App/Stores/accountStoreOwner.slice";
import StoreOwnerTable from "./Contents/StoreOwnerTable";
import StoreOwnerDetails from "./Contents/StoreOwnerDetails";

const StoreOwnerPage = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [storeOwner, setStoreOwner] = useState(null);
  const handlePaging = (number, search) => {
    if (search) {
      dispatch(
        loadAccounts({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadAccounts({ pageIndex: number }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadAccounts({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {
    setVisible(true);
    setStoreOwner(null);
  };
  const onRowSelect = (storeOwner) => {
    setVisible(true);
    setStoreOwner(storeOwner);
  };
  const onCancel = () => setVisible(false);

  return (
    <PageWrapper className="building-page">
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header
              handleRefresh={handleRefresh}
              handleCreate={handleCreate}
              handleDelete={handleDelete}
            />
            <StoreOwnerTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <StoreOwnerDetails
          visible={visible}
          onCancel={onCancel}
          storeOwner={storeOwner}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default StoreOwnerPage;
