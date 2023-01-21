module.exports = function newError(next, code, message) {
  const error = new Error(message);
  error.statusCode = code;
  next(error);
  return;
}