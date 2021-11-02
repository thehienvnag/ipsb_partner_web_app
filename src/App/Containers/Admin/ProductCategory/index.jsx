import React from "react";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import "./index.scss";
import Header from "./Header";
import { useRowDetails } from "App/Utils/hooks/useRowDetails";
import ProductCategoryTable from "./Contents/ProductCategoryTable";
import ProductCategoryDetails from "./Contents/ProductCategoryDetails";

const ProductCategoryPage = () => {
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
            <ProductCategoryTable refresh={refresh} onRowSelect={onRowSelect} />
          </Card>
        </Col>
        <ProductCategoryDetails
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

export default ProductCategoryPage;
