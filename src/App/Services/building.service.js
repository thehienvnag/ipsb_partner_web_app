import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { buildings } from "../Utils/Constants/endpoints";
/**
 * Get buildings
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getBuildings = async (
  { pageIndex = 1, pageSize = 5, isAll = false, status = "Active" },
  searchParams = {}
) => {
  const params = { pageIndex, pageSize, isAll, status, ...searchParams };
  return (await axiosClient.get(buildings, { params })).data;
};

/**
 * Get building by manager id
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.managerId] manager id of the building
 */
export const getBuildingByManagerId = async ({
  pageIndex = 1,
  pageSize = 5,
  managerId,
}) => {
  const params = { pageIndex, pageSize, managerId };
  return (await axiosClient.get(buildings, { params })).data;
};

/**
 * Create building
 * @param {object} [data] values post
 */
export const postBuilding = async (data) => {
  return (await postFormData(buildings, data)).data;
};

/**
 * Update building
 * @param {object} [data] building data to update
 */
export const putBuilding = async (id, data) => {
  return (await putFormData(buildings + "/" + id, data)).data;
};

/**
 * Delete building
 * @param {object} [id] building id
 */
export const deleteBuilding = async (id) => {
  return (await axiosClient.delete(buildings + "/" + id)).status === 204;
};
