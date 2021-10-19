import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { couponTypes } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAllCouponType = async (
  { pageIndex = 1, pageSize = 5, isAll = false, status = "Active" },
  searchParams = {}
) => {
  const params = { pageIndex, pageSize, isAll, status, ...searchParams };
  return (await axiosClient.get(couponTypes, { params })).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postCouponType = async (data) => {
  return (await axiosClient.post(couponTypes, data)).data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putCouponType = async (data) => {
  const { id } = data;
  return (await axiosClient.put(couponTypes + "/" + id, data)).data;
};
