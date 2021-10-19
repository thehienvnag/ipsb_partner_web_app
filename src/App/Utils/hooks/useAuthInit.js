import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  retrieveAuthInfo,
  selectAuthPresentStatus,
  selectLoading,
} from "App/Stores/auth.slice";
export const useAuthInit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authPresent = useSelector(selectAuthPresentStatus);
  const isAuthLoading = useSelector(selectLoading);

  const [firstInit, setFirstInit] = useState(true);
  useEffect(() => {
    let firstInitVar = firstInit;
    if (isAuthLoading) {
      firstInitVar = false;
      console.log("Loading");
      setFirstInit(firstInitVar);
    }
    if (firstInitVar && !authPresent) {
      console.log("Init");
      dispatch(retrieveAuthInfo(localStorage.getItem("accountId")));
    }
    if (!firstInitVar && !isAuthLoading && !authPresent) {
      console.log("Fail auth!");
      navigate("../login");
    }
  }, [isAuthLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  return { authPresent };
};
