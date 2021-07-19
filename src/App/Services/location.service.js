import axiosClient from "../Utils/axiosClient";
import { locations } from "../Constants/endpoints";

/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.locationTypeId] location type id
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getByFloorPlan = async ({ isAll = true, floorPlanId }) => {
  const params = { isAll, floorPlanId };
  const response = await axiosClient.get(locations, { params });
  return response.data;
};

export const getAllLoctionType = async ({
  pageIndex = 1,
  pageSize = 5,
  buildingId,
}) => {
  const params = { pageIndex, pageSize, buildingId };
  console.log(params);
  const response = await axiosClient.get(locations, { params });
  return response.data;
};
