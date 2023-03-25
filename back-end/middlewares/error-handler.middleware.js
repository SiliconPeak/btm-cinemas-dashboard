export const errorHandler = (err, req, res, next) => {
  let code = err?.status || 500;
  let msg = err?.msg || err;
  res.status(code).json({
    msg: err,
  });
};

export const errNotFound = (req, res, next) => {
  next({
    status: 400,
    msg: "Not found",
  });
};
