const jwt = require('jsonwebtoken');

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
    console.log(err, 'error');
  }
  if (decodedToken) {
    req.userId = decodedToken.userId;
    req.userEmail = decodedToken.email;
    req.username = decodedToken.username;
  }

  next();
}