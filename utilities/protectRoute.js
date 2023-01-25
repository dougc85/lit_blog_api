const jwt = require('jsonwebtoken');

const newError = require('../utilities/newError');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next();
  }

  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_STRING);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    newError(next, 403, 'Access denied; not authenticated');
  }

  req.userId = decodedToken.userId;
  req.userEmail = decodedToken.email;
  req.username = decodedToken.username;

  next();
}