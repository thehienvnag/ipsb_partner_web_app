import { accounts } from "../Constants/endpoints";
import axiosClient, { postFormData } from "../Utils/axiosClient";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAccounts = async ({ pageIndex = 1 }) => {
  const params = { pageIndex };
  const response = await axiosClient.get(accounts, { params });
  return response.data;
};

export const getAccountsPaging = async ({ pageIndex = 1, pageSize = 5 }) => {
  const params = { pageIndex, pageSize };
  console.log(params);
  const response = await axiosClient.get(accounts, { params });
  return response.data;
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postAccount = async (data) => {
  try {
    const dataPost = await postFormData(accounts, data);
    return dataPost;
  } catch (error) {
    console.log(error?.message);
  }
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const testPoseWithoutFile = async (data) => {
  try {
    const response = await axiosClient.post(accounts, data);
    return response.data;
  } catch (error) {
    console.log(error?.message);
  }
};
