import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { couponTypes } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAllCouponType = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = false,
  status = "Active",
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, isAll, status, ...searchObject  };
  return axiosClient.get(couponTypes, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
 export const postCouponType = async (data) => {
    return axiosClient.post(couponTypes, data);
  };
  
  /**
   * Page wrapper for new page
   * @param {object} [data] values post
   */
  export const putCouponType = async (data) => {
    const { id } = data;
    return axiosClient.put(couponTypes + "/" + id, data);
  };
