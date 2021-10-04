import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import CouponTypeTable from "./Contents/CouponTypeTable";
import CouponTypeDetails from "./Contents/CouponTypeDetails";
import { loadCouponTypes } from "App/Stores/couponType.slice";

const CouponTypePage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [model, setModel] = useState(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState(false);
  const handlePaging = (number, search) => {
    if (search) {
      dispatch(
        loadCouponTypes({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadCouponTypes({ pageIndex: number }));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadCouponTypes({ pageIndex: currentPage }));
  };

  const handleDelete = () => {};
  const handleCreate = () => {
    setModel(null);
    setVisible(true);
    setStatus(true);
  };

  const onRowSelect = (value) => {
    setModel(value);
    setVisible(true);
    setStatus(false);
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
            <CouponTypeTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <CouponTypeDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          couponTypeModel={model}
          statusBool={status}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default CouponTypePage;
