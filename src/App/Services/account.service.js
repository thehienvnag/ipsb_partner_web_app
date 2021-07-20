import { accounts } from "../Constants/endpoints";
import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 * @param {number} [params.pageIndex] current page of get request
 * @param {number} [params.pageSize] current page size of get request
 */
export const getAccounts = async ({
  pageIndex = 1,
  pageSize = 5,
  role = "Building Manager",
  isAll = false,
}) => {
  const params = { pageIndex, pageSize, role, isAll };
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
    return error?.message;
  }
};
/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putAccount = async (data) => {
  const { id } = data;
  try {
    const dataPost = await putFormData(accounts + "/" + id, data);
    return dataPost;
  } catch (error) {
    console.log(error?.message);
    return error?.message;
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

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const deleteAccounts = async (ids = []) => {
  try {
    await axiosClient.delete(accounts, { params: { ids } });
  } catch (error) {
    console.log(error?.message);
    return error?.message;
  }
};
