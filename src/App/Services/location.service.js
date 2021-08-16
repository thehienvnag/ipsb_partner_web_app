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
  const params = { isAll, floorPlanId, status: "Active" };
  const response = await axiosClient.get(locations, { params });
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for get request
 */
export const postLocations = async (list) => {
  const response = await axiosClient.post(locations, list);
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {Array} [data] parameters for get request
 */
export const deleteLocations = async (ids) => {
  const response = await axiosClient.delete(locations, { data: { ids: ids } });
  return response.status === 204;
};

/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.floorPlanId] building id which contains floor plans
 */
export const getByFloorIdForStairLift = async (floorPlanId) => {
  const response = await axiosClient.get(locations, {
    params: { floorPlanId, locationTypeIds: [3, 4], isAll: true },
  });
  return response.data?.content;
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
