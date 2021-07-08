import { Col, Row, Layout } from "antd";

import React from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
const { Footer, Content } = Layout;
// import DashboardMenu from "./DashboardMenu";

const DashboardLayout = () => {
  return (
    <>
      <Layout style={{ backgroundColor: "#F4F6FA" }}>
        <DashboardHeader />
        <Layout>
          <DashboardSidebar />
          <Content>
            <Outlet />
            <Footer style={{ height: 50 }}>Footer</Footer>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
