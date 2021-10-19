import axiosClient, { postFormData } from "../Utils/axiosClient";
import { stores } from "../Utils/Constants/endpoints";
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
  return (await axiosClient.get(stores, { params })).data;
};

export const getStoreByBuildingId = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = true,
  buildingId,
}) => {
  const params = { pageIndex, pageSize, buildingId, isAll };
  return (await axiosClient.get(stores, { params })).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postStore = async (data) => {
  return (await postFormData(stores, data)).data;
};
