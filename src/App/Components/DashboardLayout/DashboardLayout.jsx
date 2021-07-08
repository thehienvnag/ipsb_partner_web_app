import { Layout } from "antd";

import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
const { Footer, Content } = Layout;

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <Layout style={{ backgroundColor: "#F4F6FA" }}>
        <DashboardHeader handleCollapsed={handleCollapsed} />
        <Layout>
          <DashboardSidebar isCollapsed={isCollapsed} />
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
