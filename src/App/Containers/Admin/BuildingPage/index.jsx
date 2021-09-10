import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import { loadBuildings } from "App/Stores/building.slice";
import BuildingTable from "./Contents/BuildingTable";
import BuildingDetails from "./Contents/BuildingDetails";

const BuildingPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [building, setBuilding] = useState(null);
  const [visible, setVisible] = useState(false);

  const handlePaging = (number, search) => {
    if (search) {
      dispatch(
        loadBuildings({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadBuildings({ pageIndex: number }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadBuildings({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {
    setBuilding(null);
    setVisible(true);
  };

  const onRowSelect = (value) => {
    setBuilding(value);
    setVisible(true);
  };
  return (
    <PageWrapper>
      <PageBody noWrap={true}>
        <Col flex="auto">
          <Card className="card-table">
            <Header
              handleRefresh={handleRefresh}
              handleCreate={handleCreate}
              handleDelete={handleDelete}
            />
            <BuildingTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <BuildingDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          building={building}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default BuildingPage;
