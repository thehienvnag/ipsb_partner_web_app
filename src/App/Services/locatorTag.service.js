import axiosClient from "../Utils/axiosClient";
import { locatorTags } from "../Utils/Constants/endpoints";
/**
 * get locator tags
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.floorPlanId] building id which contains floor plans
 */
export const getLocatorTags = async (
  { pageIndex = 1, pageSize = 5, status = "Active", buildingId, isAll = true },
  searchParams = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    status,
    buildingId,
    isAll,
    ...searchParams,
  };
  return (await axiosClient.get(locatorTags, { params })).data;
};

/**
 * Count locator tags
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 * @param {number} [params.isAll] whether get all locator tags
 */
export const countLocatorTags = async ({
  pageIndex = 1,
  pageSize = 5,
  status = "Active",
  buildingId,
  isAll,
}) => {
  const params = {
    pageIndex,
    pageSize,
    status,
    buildingId,
    isAll,
  };
  return (await axiosClient.get(locatorTags + "/count", { params })).data;
};

/**
 * Create locator
 * @param {object} [data] values to create
 */
export const postLocatorTag = async (data) => {
  return (await axiosClient.post(locatorTags, data)).data;
};

/**
 * Update locator tag
 * @param {object} [data] building locator tag to update
 */
export const putLocatorTag = async (id, data) => {
  return (await axiosClient.put(locatorTags + "/" + id, data)).data;
};

/**
 * Delete building
 * @param {object} [id] locator tag id
 */
export const deleteLocatorTag = async (id) => {
  return (await axiosClient.delete(locatorTags + "/" + id)).status === 204;
};
