import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { floorPlans } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAll = async ({ pageIndex = 1, pageSize = 5, buildingId }) => {
  const params = { pageIndex, pageSize, buildingId };
  return (await axiosClient.get(floorPlans, { params })).data;
};
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.id] building id which contains floor plans
 */
export const getById = async (id) => {
  return (await axiosClient.get(`${floorPlans}/${id}`)).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postFloorPlan = async (data) => {
  return (await postFormData(floorPlans, data)).data;
};
/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putFloorPlan = async (data) => {
  return (await putFormData(floorPlans + "/" + data.id, data)).data;
};
