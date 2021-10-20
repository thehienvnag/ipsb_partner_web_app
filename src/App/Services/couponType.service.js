import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { couponTypes } from "../Utils/Constants/endpoints";
/**
 * Get coupon types
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
 * Create coupon type
 * @param {object} [data] values to create
 */
export const postCouponType = async (data) => {
  return (await axiosClient.post(couponTypes, data)).data;
};

/**
 * Update coupon type
 * @param {number} [id] coupon type id
 * @param {object} [data] values to update
 */
export const putCouponType = async (id, data) => {
  return (await axiosClient.put(couponTypes + "/" + id, data)).data;
};

/**
 * Delete coupon type
 * @param {number} [id] coupon type id
 */
 export const deleteCouponType = async (id) => {
  return (await axiosClient.delete(couponTypes + "/" + id)).status === 204;
};
