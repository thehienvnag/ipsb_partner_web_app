import axiosClient, { postFormData } from "../Utils/axiosClient";
import { visitPoint } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 * * @param {number} [params.buildingId] locationtype id 
 */

export const getVisitPointByBuildingId = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = true,
  buildingId,
  locationTypeId
}) => {
  const params = { pageIndex, pageSize, buildingId, locationTypeId, isAll };
  return axiosClient.get(visitPoint, { params });
};

