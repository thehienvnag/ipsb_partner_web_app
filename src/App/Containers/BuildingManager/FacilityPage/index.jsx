import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import Header from "./Header";
import "./index.scss";
import FacilityTable from "./Contents/FacilityTable";
import FacilityDetails from "./Contents/FacilityDetails";
import { loadFacilitys } from "App/Stores/facility.slice";

const FacilityPage = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [facility, setFacility] = useState(null);
  const [status, setStatus] = useState(false);

  const handlePaging = (number, search) => {
    if (search) {
      dispatch(
        loadFacilitys({ pageIndex: number, searchObject: search, status: "" }),
      );
    } else {
      dispatch(loadFacilitys({ pageIndex: number }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadFacilitys({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {
    setVisible(true);
    setFacility(null);
    setStatus(true);
  };
  const onRowSelect = (value) => {
    setVisible(true);
    setFacility(value);
    setStatus(false);
  };
  const onCancel = () => setVisible(false);

  return (
    <PageWrapper className="facility-page">
      <PageBody>
        <Col flex="auto">
          <Card className="card-table">
            <Header
              handleRefresh={handleRefresh}
              handleCreate={handleCreate}
              handleDelete={handleDelete}
            />
            <FacilityTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <FacilityDetails
          visible={visible}
          onCancel={onCancel}
          facility={facility}
          statusBool={status}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default FacilityPage;
