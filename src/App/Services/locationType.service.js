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
  const params = { pageIndex, pageSize, isAll, status, ...searchObject  };
  console.log(params);
  return axiosClient.get(locationTypes, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
 export const postLocationType = async (data) => {
    return postFormData(locationTypes, data);
  };
  
  /**
   * Page wrapper for new page
   * @param {object} [data] values post
   */
  export const putLocationType = async (data) => {
    const { id } = data;
    return putFormData(locationTypes + "/" + id, data);
  };
