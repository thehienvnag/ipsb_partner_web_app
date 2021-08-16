import axiosClient from "../Utils/axiosClient";
import { auth } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [data] parameters for post request
 * @param {string} [data.email] email of account
 * @param {string} [data.password] password of account
 */
export const checkLogin = async ({ email, password }) => {
  const data = { email, password };
  try {
    const response = await axiosClient.post(auth + "/login", data);
    return response.data;
  } catch (e) {}
};

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for post request
 * @param {string} [data.accountId] id of account
 * @param {string} [data.password] password of account
 */
export const changePassword = async ({ accountId, password }) => {
  const data = { accountId, password };
  console.log("ACCOUNTID: ", accountId);
  const response = await axiosClient.put(auth + "/change-password", data);
  return response.status;
};
