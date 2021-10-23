import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
const DashboardFooter = () => {
  return (
    <Footer
      style={{
        height: 30,
        width: "82vw",
        position: "fixed",
        bottom: 0,
        padding: "4px 10px 0 10px",
        zIndex: 3,
      }}
    >
      <p style={{ textAlign: "right" }}>
        COPYRIGHT © 2021
        <a> IPSB - Indoor Position System applying iBeacon</a>
      </p>
    </Footer>
  );
};

export default DashboardFooter;
