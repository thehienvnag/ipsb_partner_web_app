import axiosClient from "../Utils/axiosClient";
import { auth } from "../Utils/Constants/endpoints";
/**
 * Authorize access token
 * @param {object} [data] parameters for post request
 * @param {string} [data.token] access token
 */
export const authorizeToken = ({ token }) => {
  const params = { token };
  return axiosClient.get(auth + "/authorize-token", { params });
};

/**
 * Check forgot password
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 */
export const checkForgotPassword = ({ email }) => {
  return axiosClient.post(auth + "/forgot-password", { email });
};

/**
 * Check user login credentials
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 * @param {string} [data.password] password of account
 */
export const checkLogin = ({ email, password }) => {
  const data = { email, password };
  return axiosClient.post(auth + "/login", data);
};

/**
 * Change user password
 * @param {object} [data] parameters for post request
 * @param {string} [data.accountId] id of account
 * @param {string} [data.password] password of account
 */
export const changePassword = ({ accountId, password }) => {
  const data = { accountId, password };
  return axiosClient.put(auth + "/change-password", data);
};

/**
 * Refresh access token
 */
export const refreshToken = () => {
  return axiosClient.post(auth + "/refresh-token", {});
};

/**
 * Log user out
 */
export const logUserOut = async () => {
  return axiosClient.get(auth + "/logout");
};
