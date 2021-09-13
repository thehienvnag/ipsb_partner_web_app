import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { buildings } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getBuildings = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = false,
  status = "Active",
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, isAll, status, ...searchObject };
  return axiosClient.get(buildings, { params });
};

/**
 * Page wrapper for new page
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
  return axiosClient.get(buildings, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postBuilding = async (data) => {
  return postFormData(buildings, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putBuilding = async (data) => {
  const { id } = data;
  return putFormData(buildings + "/" + id, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const testPoseWithoutFile = async (data) => {
  return axiosClient.post(buildings, data);
};
