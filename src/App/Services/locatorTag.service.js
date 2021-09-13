import axiosClient from "../Utils/axiosClient";
import { locatorTags } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.floorPlanId] building id which contains floor plans
 */
export const getLocatorTags = async ({
  pageIndex = 1,
  pageSize = 5,
  status = "Active",
  floorPlanId,
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, status, floorPlanId, ...searchObject };
  return axiosClient.get(locatorTags, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postLocatorTag = async (data) => {
  return axiosClient.post(locatorTags, data);
};
