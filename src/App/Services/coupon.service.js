import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { coupons } from "../Utils/Constants/endpoints";
/**
 * Get coupons
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.storeId] store id which contains coupons
 */
export const getAllCoupon = async (
  { pageIndex = 1, pageSize = 5, status = "Active", storeId },
  searchParams = {}
) => {
  const params = { pageIndex, pageSize, status, storeId, ...searchParams };
  return (await axiosClient.get(coupons, { params })).data;
};

/**
 * Count coupons
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.storeId] store id which contains coupons
 * @param {number} [params.isAll] whether get all coupons
 */
export const countCoupon = async ({
  pageIndex = 1,
  pageSize = 5,
  status = "Active",
  storeId,
  isAll,
}) => {
  const params = { pageIndex, pageSize, status, storeId, isAll };
  return (await axiosClient.get(coupons + "/count", { params })).data;
};

/**
 * Create coupon
 * @param {object} [data] values to post
 */
export const postCoupon = async (data) => {
  return (await postFormData(coupons, data)).data;
};

/**
 * Update coupon
 * @param {object} [data] values to update
 * @param {number} [id] Coupon id
 */
export const putCoupon = async (id, data) => {
  return (await putFormData(coupons + "/" + id, data)).data;
};

/**
 * Delete coupon
 * @param {number} [id] Coupon id
 */
export const deleteCoupon = async (id) => {
  const status = (await axiosClient.delete(coupons + "/" + id)).status;
  return status === 204;
};
