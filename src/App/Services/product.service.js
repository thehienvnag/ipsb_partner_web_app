import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { products } from "App/Utils/Constants/endpoints";

/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.storeId] store id which contains products
 */
export const getAllProduct = async ({
  pageIndex = 1,
  pageSize = 5,
  status = "Active",
  storeId,
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, status, storeId, ...searchObject };
  return axiosClient.get(products, { params });
};

export const getAllProductOfStore = async ({
  status = "Active",
  storeId,
  searchObject = {},
}) => {
  const params = { status, storeId, ...searchObject };
  return axiosClient.get(products, { isAll: true, params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postProduct = async (data) => {
  return postFormData(products, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putProduct = async (data) => {
  return putFormData(products + "/" + data.id, data);
};
