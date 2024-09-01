export const handleSuccess = (
  res,
  statusCode = 200,
  message = "",
  data = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const handleError = (res, statusCode = 401, message = "") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
