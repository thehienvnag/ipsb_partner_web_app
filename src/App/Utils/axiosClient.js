import axios from "axios";
import queryString from "query-string";

// import { getFirebase } from "react-redux-firebase";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;
