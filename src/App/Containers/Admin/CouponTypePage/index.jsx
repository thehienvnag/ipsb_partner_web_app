import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import CouponTypeTable from "./Contents/CouponTypeTable";
import CouponTypeDetails from "./Contents/CouponTypeDetails";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const CouponTypePage = () => {
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
    <PageWrapper>
      <PageBody noWrap={true}>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <CouponTypeTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <CouponTypeDetails
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

export default CouponTypePage;
