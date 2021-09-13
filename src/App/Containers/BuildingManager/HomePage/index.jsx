import React from "react";
import Card from "App/Components/Card";
import { PageBody, PageWrapper } from "App/Components/PageWrapper";
// import { getFloorPlans } from "App/Services/floorPlan.service";
import "./index.scss";

const BmHomePage = () => {
  return (
    <PageWrapper>
      <PageBody>
        <Card title="Card">Home Page</Card>
      </PageBody>
    </PageWrapper>
  );
};

export default BmHomePage;
