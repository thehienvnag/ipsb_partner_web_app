import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { loadCoupons } from "App/Stores/coupon.slice";
import "./index.scss";
import Header from "./Header";

import CouponDetails from "./Content/ManageCouponDetails";
import ManageCouponTable from "./Content/ManageCouponTable";

const ManageCouponPage = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [visibleDate, setVisibleDate] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePaging = (number, search) => {
    if (search) {
      console.log(search);
      dispatch(
        loadCoupons({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadCoupons({ pageIndex: number}));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadCoupons({ pageIndex: currentPage }));
  };

  const handleCreate = () => {
    setVisible(true);
    setCoupon(null);
    setVisibleDate(false);
  };
  const onRowSelect = (value) => {
    setVisible(true);
    setCoupon(value);
    setVisibleDate(true);
  };
  return (
    <PageWrapper className="coupon-page">
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <ManageCouponTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <CouponDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          model={coupon}
          visibleDate={visibleDate}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default ManageCouponPage;
