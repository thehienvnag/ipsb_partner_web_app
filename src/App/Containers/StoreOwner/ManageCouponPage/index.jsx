import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";

import CouponDetails from "./Content/ManageCouponDetails";
import ManageCouponTable from "./Content/ManageCouponTable";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const ManageCouponPage = () => {
  const {
    refresh,
    visible,
    item,
    handleRefresh,
    handleCreate,
    onRowSelect,
    handleCancel,
  } = useRowDetails();

  return (
    <PageWrapper className="coupon-page">
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <ManageCouponTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <CouponDetails
          visible={visible}
          model={item}
          onCancel={handleCancel}
          handleRefresh={handleRefresh}
          handleCancel={handleCancel}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default ManageCouponPage;
