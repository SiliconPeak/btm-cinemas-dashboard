import axiosInstance from "../configs/axios";

let headers: any = {};
const getHeader = (is_strict: boolean, form_data: any) => {
  if (is_strict) {
    let token = localStorage.getItem("btm-token"); //login jwt
    headers["authorization"] = "Bearer " + token;
  }
  if (form_data) {
    headers["content-type"] = "multipart/form-data";
  }
};

export const httpPostRequest = (
  url: any,
  data: any,
  is_strict = false,
  form_data = false
) => {
  getHeader(is_strict, form_data);
  return axiosInstance.post(url, data, {
    headers: { ...headers },
  });
};

export const httpPutRequest = (
  url: any,
  data: any,
  is_strict = false,
  form_data = false
) => {
  getHeader(is_strict, form_data);
  return axiosInstance.put(url, data, { headers: { ...headers } });
};

export const httpGetRequest = async (url: any, is_strict = false) => {
  getHeader(is_strict, false);
  let response = await axiosInstance.get(url, { headers: { ...headers } });
  return response;
};

export const httpDeleteRequest = async (url: any, is_strict = false) => {
  getHeader(is_strict, false);
  let response = await axiosInstance.delete(url, { headers: { ...headers } });
  return response;
};
