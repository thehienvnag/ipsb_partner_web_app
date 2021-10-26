import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { floorPlans } from "../Utils/Constants/endpoints";
/**
 * Get floor plans
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAll = async (
  {
    pageIndex = 1,
    pageSize = 5,
    buildingId,
    notFloorPlanId,
    status = "Active",
  },
  searchParams = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    buildingId,
    notFloorPlanId,
    status,
    ...searchParams,
  };
  return (await axiosClient.get(floorPlans, { params })).data;
};
/**
 * Get floor plan by id
 * @param {number} [id] Floor plan id
 */
export const getById = async (id) => {
  return (await axiosClient.get(`${floorPlans}/${id}`)).data;
};

/**
 * Create floorplan
 * @param {object} [data] values to create
 */
export const postFloorPlan = async (data) => {
  return (await postFormData(floorPlans, data)).data;
};
/**
 * Update floor plan
 * @param {object} [data] values to update
 * @param {number} [id] floor plan id
 */
export const putFloorPlan = async (id, data) => {
  return (await putFormData(floorPlans + "/" + id, data)).status === 204;
};

/**
 * Update floor plan
 * @param {number} [id] floor plan id
 */
export const deleteFloorPlan = async (id) => {
  return (await axiosClient.delete(floorPlans + "/" + id)).status === 204;
};
