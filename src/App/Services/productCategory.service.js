import axiosClient from "../Utils/axiosClient";
import { productCategories } from "App/Constants/endpoints";
/**
 * Page wrapper for new page
 */
export const getAllProductCategories = async () => {
  const response = await axiosClient.get(productCategories, { isAll: true });
  return response.data;
};
