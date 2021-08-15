import { accounts } from "../Constants/endpoints";
import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";
/**
 * Get accounts functions
 * @param {object} [params] parameters for get request
 */
export const getAccounts = async ({
  pageIndex = 1,
  pageSize = 5,
  role = "Building Manager",
  status = "Active",
  isAll = false,
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, role, status, isAll, ...searchObject };
  const response = await axiosClient.get(accounts, { params });
  return response.data;
};

/**
 * Get accounts with store owner role functions
 * @param {object} [params] parameters for get request
 */
export const getAccountsStoreOwner = async ({
  pageIndex = 1,
  pageSize = 5,
  role = "Store Owner",
  status = "Active",
  isAll = false,
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, status, role, isAll, ...searchObject };
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
    const removeAll = ids.map(
      async (id) => await axiosClient.delete(accounts + "/" + id)
    );
    await Promise.all(removeAll);
    // await axiosClient.delete(accounts, { params: { ids } });
  } catch (error) {
    console.log(error?.message);
    return error?.message;
  }
};
