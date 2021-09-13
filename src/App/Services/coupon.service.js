import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { coupons } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.storeId] store id which contains coupons
 */
export const getAllCoupon = async ({
  pageIndex = 1,
  pageSize = 5,
  status = "Active",
  storeId,
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, status, storeId, ...searchObject };
  return axiosClient.get(coupons, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postCoupon = async (data) => {
  return postFormData(coupons, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putCoupon = async (data) => {
  return putFormData(coupons + "/" + data.id, data);
};
