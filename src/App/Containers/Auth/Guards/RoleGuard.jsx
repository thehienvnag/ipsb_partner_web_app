import React, { useEffect } from "react";
import {  selectIsLogginOut, selectRole } from "App/Stores/auth.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BmHomePage from "App/Containers/BuildingManager/HomePage";
import AdHomePage from "App/Containers/Admin/HomePage";
import SOHomePage from "App/Containers/StoreOwner/ManageCouponPage/HomePage";

const RoleGuard = ({ role, component }) => {
  const isLoginOut = useSelector(selectIsLogginOut);
  const currentRole = useSelector(selectRole);
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoginOut) {
      navigate("../login");
    }
  }, [isLoginOut]);

  return (
    <>
      {(currentRole === role && component) ||
        (currentRole === "Building Manager" && <BmHomePage />) ||
        (currentRole === "Admin" && <AdHomePage />) ||
        (currentRole === "Store Owner" && <SOHomePage />)}
    </>
  );
};

export default RoleGuard;
