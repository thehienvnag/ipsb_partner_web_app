import axios from "axios";
import queryString from "query-string";

// import { getFirebase } from "react-redux-firebase";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const postFormData = async (endpoint, values) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }
  // post config
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axiosClient.post(endpoint, formData, config);
};

export const putFormData = async (endpoint, values) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.append(key, value);
  }
  // put config
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axiosClient.put(endpoint, formData, config);
};

export default axiosClient;
