const utilsHelper = {};

utilsHelper.sendResponse = (res, status, success, data, errors, message) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (message) response.message = message;
  return res.status(status).json(response);
};

utilsHelper.catchAsync = (func) => (req, res, next) =>
  func(req, res, next).catch((err) => next(err));

utilsHelper.throwError = (status, message, type) => {
  const newError = new Error(message);
  newError.statusCode = status;
  newError.message = message;
  newError.type = type;
  newError.isOperational = true;
  throw newError;
};

module.exports = utilsHelper;
