import React, { useEffect } from "react";
import {
  selectBuildingId,
  selectRole,
  selectStoreId,
} from "App/Stores/auth.slice";
import { useSelector } from "react-redux";

import BmHomePage from "App/Containers/BuildingManager/HomePage";
import SOHomePage from "App/Containers/StoreOwner/ManageCouponPage/HomePage";
import { useLocation, useNavigate } from "react-router";

const RoleGuard = ({ role, component }) => {
  const currentRole = useSelector(selectRole);
  const storeId = useSelector(selectStoreId);
  const buildingId = useSelector(selectBuildingId);
  const { pathname } = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    if (currentRole === "Admin") {
      navigate("../buildings");
    }
    if (
      currentRole === "Building Manager" &&
      !buildingId &&
      !pathname.includes("not-allow")
    ) {
      navigate("../not-allow");
    }
    if (
      currentRole === "Store Owner" &&
      !storeId &&
      !pathname.includes("not-allow")
    ) {
      navigate("../not-allow");
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
