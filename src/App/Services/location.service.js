import axiosClient from "../Utils/axiosClient";
import { locations } from "../Utils/Constants/endpoints";

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
  return axiosClient.get(locations, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] parameters for get request
 */
export const postLocations = async (list) => {
  return axiosClient.post(locations, list);
};

/**
 * Page wrapper for new page
 * @param {Array} [data] parameters for get request
 */
export const deleteLocations = async (ids) => {
  return axiosClient.delete(locations, { data: { ids: ids } });
};

/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.floorPlanId] building id which contains floor plans
 */
export const getByFloorIdForStairLift = async (floorPlanId) => {
  const params = { floorPlanId, locationTypeIds: [3, 4], isAll: true };
  return axiosClient.get(locations, {
    params,
  });
};
export const getAllLocation = async ({
  pageIndex = 1,
  pageSize = 5,
  buildingId,
  locationTypeName,
}) => {
  const params = {
    pageIndex,
    pageSize,
    buildingId,
    locationTypeIds: [6, 10, 11, 12, 13, 14, 15],
    locationTypeName,
  };
  return axiosClient.get(locations, { params });
};
