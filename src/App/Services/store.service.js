import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { stores } from "../Utils/Constants/endpoints";
/**
 * Get stores
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAllStore = async (
  { pageIndex = 1, pageSize = 5, buildingId, status = "Active" },
  searchParams = {}
) => {
  const params = { pageIndex, pageSize, buildingId, status, ...searchParams };
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
 * Create store
 * @param {object} [data] values post
 */
export const postStore = async (data) => {
  return (await postFormData(stores, data)).data;
};

/**
 * Update store
 * @param {number} [id] Store id
 * @param {object} [data] values to update
 */
export const putStore = async (id, data) => {
  return (await putFormData(stores + "/" + id, data)).data;
};

/**
 * Delete store
 * @param {number} [id] Store id
 */
export const deleteStore = async (id) => {
  return (await axiosClient.delete(stores + "/" + id)).status === 204;
};
