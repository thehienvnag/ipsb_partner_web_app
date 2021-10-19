import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { Layout } from "antd";
import { useAuthInit } from "App/Utils/hooks/useAuthInit";

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
              <Footer
                style={{
                  height: 30,
                  width: "100vw",
                  position: "fixed",
                  bottom: 0,
                  padding: "4px 10px 0 10px",
                  zIndex: 3,
                }}
              >
                <p>
                  COPYRIGHT © 2021
                  <a> IPSB - Indoor Position System applying iBeacon</a>
                </p>
              </Footer>
            </Content>
          </Layout>
        </Layout>
      </>
    )
  );
};

export default DashboardLayout;
