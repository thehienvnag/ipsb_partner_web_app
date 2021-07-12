import React from "react";
import "./index.scss";
import Header from "./Header/index";
import { Card } from "antd";
import { PageWrapper, PageBody } from "App/Components/PageWrapper";
import StoreTable from "./Contents/StoreTable/index";

const StorePage = () => {
  return (
    <PageWrapper>
      <Header />
      <PageBody>
        <Card>
          <StoreTable />
        </Card>
      </PageBody>
    </PageWrapper>
  );
};
export default StorePage;
