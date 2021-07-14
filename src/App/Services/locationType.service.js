import axiosClient from "../Utils/axiosClient";
import { locationType } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAllLoctionType = async ({
  pageIndex = 1,
  pageSize = 5,
  buildingId,
}) => {
  const params = { pageIndex, pageSize, buildingId };
  console.log(params);
  const response = await axiosClient.get(locationType, { params });
  return response.data;
};
