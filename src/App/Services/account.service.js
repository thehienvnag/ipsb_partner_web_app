import { accounts } from "../Utils/Constants/endpoints";
import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";


/**
 * Get account by id
 * @param {number} [id] parameters for get request
 */
 export const getAccountById = async (id) => {
  return axiosClient.get(`${accounts}/${id}`);
};


/**
 * Get accounts functions
 * @param {object} [params] parameters for get request
 */
export const getAccounts = async ({
  pageIndex = 1,
  pageSize = 5,
  role,
  status = "Active",
  isAll = false,
  searchObject = {},
}) => {
  const params = { pageIndex, pageSize, role, status, isAll, ...searchObject };
  return axiosClient.get(accounts, { params });
};
/**
 * Get accounts functions
 * @param {object} [params] parameters for get request
 */
export const getBuildingManagers = async ({
  pageIndex = 1,
  pageSize = 5,
  role = "Building Manager",
  status = "Active",
  isAll = false,
  searchObject = {},
}) => {
  const params = {
    pageIndex,
    pageSize,
    role,
    status,
    isAll,
    ...searchObject,
  };
  return axiosClient.get(accounts, { params });
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
  const params = {
    pageIndex,
    pageSize,
    status,
    role,
    isAll,
    ...searchObject,
  };
  return axiosClient.get(accounts, { params });
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const postAccount = async (data) => {
  return postFormData(accounts, data);
};
/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const putAccount = async (data) => {
  const { id } = data;
  return putFormData(accounts + "/" + id, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const testPoseWithoutFile = async (data) => {
  return axiosClient.post(accounts, data);
};

/**
 * Page wrapper for new page
 * @param {object} [data] values post
 */
export const deleteAccounts = async (id) => {
  return axiosClient.delete(accounts + "/" + id);
};
