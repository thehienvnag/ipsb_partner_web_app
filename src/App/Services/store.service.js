import axiosClient, { postFormData } from "../Utils/axiosClient";
import { stores } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAllStore = async ({
  pageIndex = 1,
  pageSize = 5,
  buildingId,
}) => {
  const params = { pageIndex, pageSize, buildingId };
  return axiosClient.get(stores, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postStore = async (data) => {
  return postFormData(stores, data);
};
