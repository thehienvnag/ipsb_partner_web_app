import axiosClient, { postFormData , putFormData} from "../Utils/axiosClient";
import { products } from "App/Constants/endpoints";

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
  console.log(params);
  const response = await axiosClient.get(products, { params });
  return response.data;
};

export const getAllProductOfStore = async ({
  status = "Active",
  storeId,
  searchObject = {},
}) => {
  const params = {status, storeId, ...searchObject };
  console.log(params);
  const response = await axiosClient.get(products, { isAll: true , params  });
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postProduct = async (data) => {
  try {
    const dataPost = await postFormData(products, data);
    return dataPost;
  } catch (error) {
    console.log(error?.message);
  }
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
 export const putProduct = async (data) => {
  try {
    const dataPut = await putFormData(products + "/" + data.id, data);
    return dataPut;
  } catch (error) {
    console.log(error?.message);
  }
};

