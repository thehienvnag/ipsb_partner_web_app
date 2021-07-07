import axios from "axios";
import queryString from "query-string";
// import { getFirebase } from "react-redux-firebase";
console.log(process.env.REACT_APP_API_URL);
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
//#region Future firebase auth
// axiosClient.interceptors.request.use(async (config) => {
//   const firebase = getFirebase();
//   const currentUser = firebase.auth().currentUser;
//   let idTokenResult = await currentUser.getIdTokenResult();
//   config.headers["Authorization"] = "Bearer " + idTokenResult.token;
//   return config;
// });
//#endregion
export default axiosClient;
