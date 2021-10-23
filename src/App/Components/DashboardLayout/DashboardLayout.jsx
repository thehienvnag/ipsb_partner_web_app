import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Layout } from "antd";
import { useAuthInit } from "App/Utils/hooks/useAuthInit";
import DashboardFooter from "./DashboardFooter";

const { Footer, Content } = Layout;

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { authPresent } = useAuthInit();

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    authPresent && (
      <>
        <Layout>
          <DashboardSidebar isCollapsed={isCollapsed} />
          <Layout>
            <DashboardHeader handleCollapsed={handleCollapsed} />
            <Content style={{ paddingBottom: 50 }}>
              <Outlet />
              <DashboardFooter />
            </Content>
          </Layout>
        </Layout>
      </>
    )
  );
};

export default DashboardLayout;
