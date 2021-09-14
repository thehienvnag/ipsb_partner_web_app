import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshUserInfo, selectRole } from "App/Stores/auth.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BmHomePage from "App/Containers/BuildingManager/HomePage";
import AdHomePage from "App/Containers/Admin/HomePage";

const RoleGuard = ({ role, component }) => {
  const dispatch = useDispatch();
  const currentRole = useSelector(selectRole);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentRole) {
      navigate("../login");
    } else if (currentRole !== role) {
      navigate("../");
    }
  }, [dispatch, currentRole, navigate, role]);

  return (
    <>
      {component ||
        (role === "Building Manager" && <BmHomePage />) ||
        (role === "Admin" && <AdHomePage />)}
    </>
  );
};

export default RoleGuard;
