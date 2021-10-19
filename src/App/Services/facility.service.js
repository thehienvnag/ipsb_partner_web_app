import axiosClient from "../Utils/axiosClient";
import { facilities } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAllFacility = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = false,
  // status = "Active",
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, isAll, ...searchObject  };
  return (await axiosClient.get(facilities, { params })).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
 export const postFacility = async (data) => {
    return (await axiosClient.post(facilities, data)).data;
  };
  
  /**
   * Page wrapper for new page
   * @param {object} [data] values post
   */
  export const putFacility = async (data) => {
    const { id } = data;
    return (await axiosClient.put(facilities + "/" + id, data)).data;
  };
