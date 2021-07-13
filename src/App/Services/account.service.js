import axiosClient from "../Utils/axiosClient";
import { accounts } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAccounts = async ({ pageIndex = 1, pageSize = 5 }) => {
  const params = { pageIndex, pageSize };
  console.log(params);
  const response = await axiosClient.get(accounts, { params });
  return response.data;
};
