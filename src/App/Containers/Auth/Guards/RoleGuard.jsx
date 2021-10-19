import React, { useEffect } from "react";
import { selectRole } from "App/Stores/auth.slice";
import { useSelector } from "react-redux";

import BmHomePage from "App/Containers/BuildingManager/HomePage";
import SOHomePage from "App/Containers/StoreOwner/ManageCouponPage/HomePage";
import BuildingPage from "App/Containers/Admin/BuildingPage";
import { useNavigate } from "react-router";

const RoleGuard = ({ role, component }) => {
  const currentRole = useSelector(selectRole);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentRole === "Admin") {
      navigate("../buildings");
    }
  }, [currentRole]);
  return (
    <>
      {(currentRole === role && component) ||
        (currentRole === "Building Manager" && <BmHomePage />) ||
        (currentRole === "Store Owner" && <SOHomePage />)}
    </>
  );
};

export default RoleGuard;
