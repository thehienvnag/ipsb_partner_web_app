import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import Header from "./Header";
import "./index.scss";

import ProductDetails from "./Content/ProductDetails";
import ProductTable from "./Content/ProductTable";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";

const ProductPage = () => {
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
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <ProductTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <ProductDetails
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

export default ProductPage;
