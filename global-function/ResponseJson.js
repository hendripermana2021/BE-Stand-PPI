export const responseJson = (res, statusCode = 200, status = true, msg = "OK", data = null) => {
  return res.status(statusCode).json({
    code: statusCode,
    status,
    msg,
    ...(data && { data }),
  });
};