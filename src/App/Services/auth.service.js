import axiosClient from "../Utils/axiosClient";
import {
  auth,
  login,
  changePassword as changePass,
  refreshToken as refresh,
} from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 * @param {string} [data.password] password of account
 */
export const checkLogin = async ({ email, password }) => {
  const data = { email, password };
  return axiosClient.post(auth + login, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for post request
 * @param {string} [data.accountId] id of account
 * @param {string} [data.password] password of account
 */
export const changePassword = async ({ accountId, password }) => {
  const data = { accountId, password };
  return axiosClient.put(auth + changePass, data);
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  try {
    const res = await axiosClient.get(auth + refresh);
    sessionStorage.setItem("accessToken", res.data.accessToken);
  } catch (error) {
    console.log(error);
  }
};
