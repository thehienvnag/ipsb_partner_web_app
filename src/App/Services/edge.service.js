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

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for get request
 */
export const postEdges = async (list) => {
  const response = await axiosClient.post(edges, list);
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {Array} [ids] parameters for get request
 */
export const deleteEdges = async (ids) => {
  const response = await axiosClient.delete(edges, { data: { ids: ids } });
  return response.status === 204;
};
