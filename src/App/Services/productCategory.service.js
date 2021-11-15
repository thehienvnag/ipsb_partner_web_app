import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
import { productCategories } from "App/Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 */
export const getAllProductCategories = async () => {
  return (await axiosClient.get(productCategories, { isAll: true })).data;
};

/**
 * Get productCategorys
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
 export const getAllProductCategoryPaging = async (
  {
    pageIndex = 1,
    pageSize = 5,
    isAll = false,
    status = "Active",
  },
  searchParams = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    isAll,
    status,
    ...searchParams,
  };
  return (await axiosClient.get(productCategories, { params })).data;
};

/**
 * Create product category
 * @param {object} [data] values to create
 */
 export const postProductCategory = async (data) => {
  return (await axiosClient.post(productCategories, data)).data;
};

/**
 * Update product category
 * @param {number} [id] product category id
 * @param {object} [data] values to update
 */
export const putProductCategory = async (id, data) => {
  return (await axiosClient.put(productCategories + "/" + id, data)).status === 204;
};

/**
 * Update product category
 * @param {number} [id] product category id
 */
export const deleteProductCategory = async (id) => {
  return (await axiosClient.delete(productCategories + "/" + id)).status === 204;
};