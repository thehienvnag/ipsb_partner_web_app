import axiosClient from "../Utils/axiosClient";
import { buildings } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getBuildings = async ({ pageIndex = 1, pageSize = 5 }) => {
  const params = { pageIndex, pageSize };
  console.log(params);
  const response = await axiosClient.get(buildings, { params });
  return response.data;
};
