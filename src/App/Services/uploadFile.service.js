import { uploadFiles } from "App/Utils/Constants/endpoints";

const { postFormData } = require("App/Utils/axiosClient");

export const uploadFile = (file) => {
  return postFormData(uploadFiles, { file });
};
