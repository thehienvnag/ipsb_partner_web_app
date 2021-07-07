import axiosClient from "../Utils/axiosClient";
import { floorPlans } from "../Constants/endpoints";
import { defaultParams } from "../Constants/constants";

/**
 * Page wrapper for new page
 * @param {object} [params] parameters for get request
 */
export const getFloorPlans = async (params = defaultParams) => {
  const response = await axiosClient.get(floorPlans, { params });
  return response.data;
};
