import axios from "axios";
import { errorResponseStatus } from "../helpers/functions";

const URL: string = "http://localhost:9001/api/v1";

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 30000,
  timeoutErrorMessage: "Server timed out",
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Interceptors Response: ", response)
    return response.data;
  },
  (errorResponse) => {
    // console.log("Interceptors Error: ", errorResponse)
    errorResponseStatus(errorResponse);
  }
);
export default axiosInstance;
