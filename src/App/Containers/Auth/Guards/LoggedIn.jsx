import { selectAccount } from "App/Stores/auth.slice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const LoggedIn = ({ component }) => {
  const account = useSelector(selectAccount);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      account &&
      account.role &&
      account.role !== "Visitor" &&
      account.status === "Active"
    ) {
      navigate("../");
    }
  }, [account, navigate]);
  return <>{component}</>;
};

export default LoggedIn;
