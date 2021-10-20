import axios from "axios";
import queryString from "query-string";
import axiosRetry from "axios-retry";
import { refreshToken } from "App/Services/auth.service";
import { logout, setAuthInfo } from "App/Stores/auth.slice";
import { Store } from "App/Stores/store";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.defaults.withCredentials = true;
axiosRetry(axiosClient, {
  retries: 1,
  retryCondition: async (error) => {
    if (error.response.status !== 401) throw error;
    if (
      error.response.status === 401 &&
      error.config.url !== "/auth/refresh-token"
    ) {
      try {
        const { accessToken } = await refreshToken();
        localStorage.setItem("accessToken", accessToken);
        return true;
      } catch (error) {}
    }
    throw error;
  },
});

axiosClient.interceptors.request.use((config) => {
  const authKey = "Authorization";
  config.headers[authKey] = "Bearer " + localStorage.getItem("accessToken");
  return config;
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
