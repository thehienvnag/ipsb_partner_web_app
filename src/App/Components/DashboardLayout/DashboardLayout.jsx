import React from "react";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardMenu from "./DashboardMenu";

const DashboardLayout = () => {
  return (
    <>
      <Helmet>
        <style>{"body { background-color: #F4F6FA; }"}</style>
      </Helmet>
      <DashboardHeader />
      <DashboardMenu />
      <Outlet />
    </>
  );
};

export default DashboardLayout;
