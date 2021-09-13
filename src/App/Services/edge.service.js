import axiosClient from "../Utils/axiosClient";
import { edges } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.floorPlanId] building id which contains floor plans
 */
export const getByFloorPlan = async ({ isAll = true, floorPlanId }) => {
  const params = { isAll, floorPlanId };
  return axiosClient.get(edges, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for get request
 */
export const postEdges = async (list) => {
  return axiosClient.post(edges, list);
};

/**
 * Page wrapper for new page
 * @param {Array} [ids] parameters for get request
 */
export const deleteEdges = async (ids) => {
  const response = await axiosClient.delete(edges, { data: { ids: ids } });
  return response.status === 204;
};
