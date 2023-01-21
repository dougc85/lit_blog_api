module.exports = function nextError(next) {
  return function (err) {
    const error = new Error(err);
    error.statusCode = 500;
    return next(error);
  }
}