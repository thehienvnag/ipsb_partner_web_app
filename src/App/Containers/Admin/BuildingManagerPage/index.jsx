import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { loadAccounts } from "App/Stores/account.slice";
import "./index.scss";
import Header from "./Header";

import BuildingManagerTable from "./Content/BuildingManagerTable";
import BuildingManagerDetails from "./Content/BuildingManagerDetails";

const BuildingManagerPage = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [buildingManager, setBuildingManager] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePaging = (number, search) => {
    if (search) {
      console.log(search);
      dispatch(
        loadAccounts({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadAccounts({ pageIndex: number, role: "Building Manager" }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadAccounts({ pageIndex: currentPage }));
  };

  const handleCreate = () => {
    setVisible(true);
    setBuildingManager(null);
  };
  const onRowSelect = (value) => {
    setVisible(true);
    setBuildingManager(value);
  };
  return (
    <PageWrapper className="building-page">
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <BuildingManagerTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <BuildingManagerDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          buildingManager={buildingManager}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default BuildingManagerPage;
