import axiosClient from "../Utils/axiosClient";
import { facilities } from "../Utils/Constants/endpoints";
/**
 * Get facilities
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAllFacility = async (
  { pageIndex = 1, pageSize = 5, isAll = false, status = "Active", buildingId },
  searchObject = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    isAll,
    status,
    buildingId,
    ...searchObject,
  };
  return (await axiosClient.get(facilities, { params })).data;
};

/**
 * Count facilities
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] id of building that facility belongs to
 * @param {number} [params.isAll] whether get all facilities
 */
export const countFacility = async ({
  pageIndex = 1,
  pageSize = 5,
  buildingId,
  isAll,
  status = "Active",
}) => {
  const params = { pageIndex, pageSize, buildingId, isAll, status };
  return (await axiosClient.get(facilities + "/count", { params })).data;
};

/**
 * Create facility
 * @param {object} [data] values to post
 */
export const postFacility = async (data) => {
  return (await axiosClient.post(facilities, data)).data;
};

/**
 * Update facility
 * @param {number} [id] facility id
 * @param {object} [data] values to put
 */
export const putFacility = async (id, data) => {
  return (await axiosClient.put(facilities + "/" + id, data)).status === 204;
};

/**
 * Delete facility
 * @param {number} [id] facility id
 */
export const deleteFacility = async (id) => {
  return (await axiosClient.delete(facilities + "/" + id)).status === 204;
};
