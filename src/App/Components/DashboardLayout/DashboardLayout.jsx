import { Layout } from "antd";

import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { BiHeart } from "react-icons/bi";
const { Footer, Content } = Layout;

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <Layout>
        <DashboardSidebar isCollapsed={isCollapsed} />
        <Layout>
          <DashboardHeader handleCollapsed={handleCollapsed} />
          <Content>
            <Outlet />
            <Footer
              style={{
                height: 50,
                width: "89vw",
                position: "fixed",
                bottom: 10,
              }}
            >
              <p
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: 100,
                }}
              >
                <p>
                  COPYRIGHT © 2021
                  <a> IPSB - Indoor Position System applying iBeacon</a>
                </p>
                <p>
                  Made with <BiHeart color="red" size={20} />
                </p>
              </p>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
