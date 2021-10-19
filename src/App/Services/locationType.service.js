import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { locationTypes } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAllLocationType = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = false,
  status = "Active",
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, isAll, status, ...searchObject };
  return (await axiosClient.get(locationTypes, { params })).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postLocationType = async (data) => {
  return (await postFormData(locationTypes, data)).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putLocationType = async (data) => {
  const { id } = data;
  return (await putFormData(locationTypes + "/" + id, data)).data;
};
