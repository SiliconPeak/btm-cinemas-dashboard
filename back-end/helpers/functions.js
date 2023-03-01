export const apiResponse = (result = null, status = true, msg = "Success") => {
  let data = {
    result: result,
    status: status,
    msg: msg,
  };
  return data;
};
