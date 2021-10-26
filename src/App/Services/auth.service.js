import axiosClient from "../Utils/axiosClient";
import { auth } from "../Utils/Constants/endpoints";
/**
 * Authorize access token
 * @param {object} [data] parameters for post request
 * @param {string} [data.token] access token
 */
export const authorizeToken = async ({ token }) => {
  const params = { token };
  return (await axiosClient.get(auth + "/authorize-token", { params })).data;
};

/**
 * Check forgot password
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 */
export const checkForgotPassword = async ({ email }) => {
  return (await axiosClient.post(auth + "/forgot-password", { email })).data;
};

/**
 * Check user login credentials
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 * @param {string} [data.password] password of account
 */
export const checkLogin = async ({ email, password }) => {
  const data = { email, password };
  return (await axiosClient.post(auth + "/login", data)).data;
};

/**
 * Change user password
 * @param {object} [data] parameters for post request
 * @param {string} [data.accountId] id of account
 * @param {string} [data.password] password of account
 */
export const changePassword = async ({ accountId, password }) => {
  const data = { accountId, password };
  return (await axiosClient.put(auth + "/change-password", data)).status;
};

/**
 * Refresh access token
 */
export const refreshToken = async () => {
  return (await axiosClient.post(auth + "/refresh-token", {})).data;
};

/**
 * Log user out
 */
export const logUserOut = async () => {
  return (await axiosClient.get(auth + "/logout")).data;
};
