import axiosClient from "../Utils/axiosClient";
import { edges } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.floorPlanId] building id which contains floor plans
 */
export const getByFloorPlan = async ({ isAll = true, floorPlanId }) => {
  const params = { isAll, floorPlanId };
  const response = await axiosClient.get(edges, { params });
  return response.data;
};
