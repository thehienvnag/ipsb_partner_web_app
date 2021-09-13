import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PAGE_SIZE } from "App/Utils/Constants/constants";
import { logout } from "App/Stores/auth.slice";
import { refreshToken } from "App/Services/auth.service";

export const usePaging = ({ dataApiCallback, requestData, page }) => {
  const [dataApi, setDataApi] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    /// Append field page and pageIndex to request data
    const request = { ...requestData, page, ...{ pageIndex: PAGE_SIZE } };
    dataApiCallback(request).then((data) => {
      setDataApi(data.content);
      setLoading(false);
    });
  }, [dataApiCallback, requestData, page]);

  return { dataApi, loading };
};

export const useAuth = (callback) => {
  const dispatch = useDispatch();
  return async (...args) => {
    // 1st try request
    try {
      const res = await callback(args);
      return res.data;
    } catch (error) {
      // Re-acquire access token incase 401 status
      if (error.response.status === 401) {
        await refreshToken();
      }
    }
    // 2nd try request
    try {
      const res = await callback(args);
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(logout());
      }
    }
  };
};
