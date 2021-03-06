import axiosClient from "../Utils/axiosClient";
import { productCategories } from "App/Utils/Constants/endpoints";
/**
 * Page wrapper for new page
 */
export const getAllProductCategories = async () => {
  return axiosClient.get(productCategories, { isAll: true });
};
