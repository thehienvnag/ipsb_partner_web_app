import { refreshToken } from "App/Services/auth.service";
import axios from "axios";
import queryString from "query-string";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { logout, setAuthInfo } from "App/Stores/auth.slice";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://localhost:44367",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.defaults.withCredentials = true;
// Instantiate the interceptor (you can chain it as it returns the axios instance)
const refreshAuthLogic = (failedRequest) =>
  refreshToken()
    .then((data) => {
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + data.accessToken;
      sessionStorage.setItem("accessToken", data.accessToken);
    })
    .catch((err) => {
      if (err.response.status === 401) {
        import("App/Stores/store").then(({ Store }) =>
          Store.dispatch(logout())
        );
      }
    });
createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

axiosClient.interceptors.request.use((config) => {
  config.headers["Authorization"] =
    "Bearer " + sessionStorage.getItem("accessToken");
  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    console.log("RESPONSE INSIDE AXIOS, ", response);

    if (response.data === "") {
      return response?.status;
    }

    return response?.data;
  }
  //async (err) => {}
);

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
