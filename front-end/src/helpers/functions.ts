import { StatusCodes } from "http-status-codes";

import { ToastContentProps, toast } from "react-toastify";

export const errorResponseStatus = (errResp: any) => {
  if (errResp.response.status === StatusCodes.INTERNAL_SERVER_ERROR) {
    return toast.error(errResp.message);
  } else if (errResp.response.status === StatusCodes.UNAUTHORIZED) {
    return toast.error(errResp.message);
  } else if (errResp.response.status === StatusCodes.BAD_REQUEST) {
    let errMag = errResp.response.data.msg;
    let msg = "";
    Object.keys(errMag).map((item) => {
      msg += errMag[item] + "\n";
      return null;
    });
    toast.error(msg);
    // console.log("Intercept: ", errResp)
  }
};
