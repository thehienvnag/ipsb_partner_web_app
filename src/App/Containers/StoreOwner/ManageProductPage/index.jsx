import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Col } from "antd";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
import { loadProducts } from "App/Stores/product.slice";
import "./index.scss";
import Header from "./Header";

import ProductDetails from "./Content/ProductDetails";
import ProductTable from "./Content/ProductTable";

const ProductPage = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [visibleDate, setVisibleDate] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePaging = (number, search) => {
    if (search) {
      console.log(search);
      dispatch(
        loadProducts({ pageIndex: number, searchObject: search, status: "" })
      );
    } else {
      dispatch(loadProducts({ pageIndex: number}));
    }
    setCurrentPage(number);
  };
  const handleRefresh = () => {
    dispatch(loadProducts({ pageIndex: currentPage }));
  };

  const handleCreate = () => {
    setVisible(true);
    setProduct(null);
    setVisibleDate(false);
  };
  const onRowSelect = (value) => {
    setVisible(true);
    setProduct(value);
    setVisibleDate(true);
  };
  return (
    <PageWrapper className="coupon-page">
      <PageBody noWrap>
        <Col flex="auto">
          <Card className="card-table">
            <Header handleRefresh={handleRefresh} handleCreate={handleCreate} />
            <ProductTable
              currentPage={currentPage}
              handlePaging={handlePaging}
              onRowSelect={onRowSelect}
            />
          </Card>
        </Col>
        <ProductDetails
          visible={visible}
          onCancel={() => setVisible(false)}
          model={product}
          visibleDate={visibleDate}
        />
      </PageBody>
    </PageWrapper>
  );
};

export default ProductPage;
