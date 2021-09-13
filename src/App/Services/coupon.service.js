import axiosClient, { postFormData , putFormData} from "../Utils/axiosClient";
import { coupons } from "../Constants/endpoints";
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
  console.log(params);
  const response = await axiosClient.get(coupons, { params });
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postCoupon = async (data) => {
  try {
    const dataPost = await postFormData(coupons, data);
    return dataPost;
  } catch (error) {
    console.log(error?.message);
  }
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
 export const putCoupon = async (data) => {
  try {
    const dataPut = await putFormData(coupons + "/" + data.id, data);
    return dataPut;
  } catch (error) {
    console.log(error?.message);
  }
};
