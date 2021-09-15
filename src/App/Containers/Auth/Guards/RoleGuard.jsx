import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectRole } from "App/Stores/auth.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BmHomePage from "App/Containers/BuildingManager/HomePage";
import AdHomePage from "App/Containers/Admin/HomePage";
import SOHomePage from "App/Containers/StoreOwner/ManageCouponPage/HomePage";

const RoleGuard = ({ role, component }) => {
  const dispatch = useDispatch();
  const currentRole = useSelector(selectRole);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentRole) {
      navigate("../login");
    } else if (role && currentRole !== role) {
      navigate("../");
    }
  }, [dispatch, currentRole, navigate, role]);

  return (
    <>
      {component ||
        (currentRole === "Building Manager" && <BmHomePage />) ||
        (currentRole === "Admin" && <AdHomePage />) ||
        (currentRole === "Store Owner" && <SOHomePage />)}
    </>
  );
};

export default RoleGuard;
