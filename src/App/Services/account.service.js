import { accounts } from "../Utils/Constants/endpoints";
import axiosClient, { postFormData, putFormData } from "../Utils/axiosClient";

/**
 * Get account by id
 * @param {number} [id] parameters for get request
 */
export const getAccountById = async (id) => {
  return (await axiosClient.get(`${accounts}/${id}`)).data;
};

/**
 * Get accounts functions
 * @param {object} [params] parameters for get request
 */
export const getAccounts = async (
  { pageIndex = 1, pageSize = 5, role, status = "Active", isAll = false },
  notManage = {},
  searchParams = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    role,
    status,
    isAll,
    ...notManage,
    ...searchParams,
  };
  return (await axiosClient.get(accounts, { params })).data;
};
/**
 * Get accounts functions
 * @param {object} [params] parameters for get request
 */
export const getBuildingManagers = async (
  {
    pageIndex = 1,
    pageSize = 5,
    role = "Building Manager",
    status = "Active",
    isAll = false,
  },
  searchParams = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    role,
    status,
    isAll,
    ...searchParams,
  };
  return (await axiosClient.get(accounts, { params })).data;
};

/**
 * Get accounts with store owner role functions
 * @param {object} [params] parameters for get request
 */
export const getAccountsStoreOwner = async (
  {
    pageIndex = 1,
    pageSize = 5,
    role = "Store Owner",
    status = "Active",
    buildingId,
    isAll = false,
  },
  searchParams = {}
) => {
  const params = {
    pageIndex,
    pageSize,
    status,
    buildingId,
    role,
    isAll,
    ...searchParams,
  };
  return (await axiosClient.get(accounts, { params })).data;
};

/**
 * Create account
 * @param {object} [data] values to post
 */
export const postAccount = async (data) => {
  return (await postFormData(accounts, data)).data;
};
/**
 * Update account
 * @param {object} [data] values to put
 */
export const putAccount = async (id, data) => {
  return (await putFormData(accounts + "/" + id, data)).data;
};

/**
 * Delete Account
 * @param {number} [id] account id
 */
export const deleteAccount = async (id) => {
  return (await axiosClient.delete(accounts + "/" + id)).status === 204;
};
