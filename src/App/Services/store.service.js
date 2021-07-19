import axiosClient, { postFormData } from "../Utils/axiosClient";
import { stores } from "../Constants/endpoints";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 * @param {number} [params.buildingId] building id which contains floor plans
 */
export const getAllStore = async ({
  pageIndex = 1,
  pageSize = 5,
  buildingId,
}) => {
  const params = { pageIndex, pageSize, buildingId };
  console.log(params);
  const response = await axiosClient.get(stores, { params });
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postStore = async (data) => {
  try {
    const dataPost = await postFormData(stores, data);
    return dataPost;
  } catch (error) {
    console.log(error?.message);
  }
};
