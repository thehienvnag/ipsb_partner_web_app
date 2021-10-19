import axiosClient from "../Utils/axiosClient";
import { couponInUses } from "../Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.storeId] store id which contains couponInUses
 */
export const getAllCouponInUse = async ({
  pageIndex = 1,
  pageSize = 5,
  isAll = true,
  status = "Used",
  storeId,
}) => {
  const params = { pageIndex, pageSize, status, storeId, isAll };
  return (await axiosClient.get(couponInUses, { params })).data;
};

