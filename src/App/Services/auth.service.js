import axiosClient from "../Utils/axiosClient";
import { auth } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 * @param {string} [data.password] password of account
 */
export const checkLogin = async ({ email, password }) => {
  const data = { email, password };
  return axiosClient.post(auth + "/login", data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for post request
 * @param {string} [data.accountId] id of account
 * @param {string} [data.password] password of account
 */
export const changePassword = async ({ accountId, password }) => {
  const data = { accountId, password };
  return axiosClient.put(auth + "/change-password", data);
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  const res = await axiosClient.get(auth + "/refresh-token", {
    skipAuthRefresh: true,
  });
  sessionStorage.setItem("accessToken", res.data.accessToken);
  return res;
};
