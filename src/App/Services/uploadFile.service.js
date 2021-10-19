import { uploadFiles } from "App/Utils/Constants/endpoints";

const { postFormData } = require("App/Utils/axiosClient");

export const uploadFile = async (file) => {
  return (await postFormData(uploadFiles, { file })).data;
};
