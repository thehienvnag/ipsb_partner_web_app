import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { BiHeart } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.scss";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import { useSelector } from "react-redux";
import { retrieveAuthInfo, selectLoading } from "App/Stores/auth.slice";
import { useDispatch } from "react-redux";
const { Footer, Content } = Layout;

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAuthLoading = useSelector(selectLoading);
  
  useEffect(() => {
    console.log('init auth');
    dispatch(retrieveAuthInfo(sessionStorage.getItem("accountId")));
  }, []);
  
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    !isAuthLoading && (
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
                  width: "89vw",
                  position: "fixed",
                  bottom: 0,
                  padding: "4px 10px 0 10px",
                  zIndex: 3,
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
    )
  );
};

export default DashboardLayout;
