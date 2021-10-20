import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { locationTypes } from "../Utils/Constants/endpoints";
/**
 * Get location types
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAllLocationType = async (
  { pageIndex = 1, pageSize = 5, isAll = false, status = "Active" },
  searchParams = {}
) => {
  const params = { pageIndex, pageSize, isAll, status, ...searchParams };
  return (await axiosClient.get(locationTypes, { params })).data;
};

/**
 * Create location type
 * @param {object} [data] values to create
 */
export const postLocationType = async (data) => {
  return (await postFormData(locationTypes, data)).data;
};

/**
 * Update location type
 * @param {number} [id] location type id
 * @param {object} [data] values to update
 */
export const putLocationType = async (id, data) => {
  return (await putFormData(locationTypes + "/" + id, data)).data;
};

/**
 * Update location type
 * @param {number} [id] location type id
 */
export const deleteLocationType = async (id) => {
  return (
    (await axiosClient.delete(locationTypes + "/" + id)).status === 204
  );
};
