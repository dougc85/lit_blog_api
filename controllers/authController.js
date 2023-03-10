const Post = require('../models/post');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const nextError = require('../utilities/nextError');
const newError = require('../utilities/newError');


exports.postSignin = (req, res, next) => {

  let {
    email,
    password
  } = req.body;

  email = email.toLowerCase().trim();

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return newError(next, 401, 'Authentication failed. Email not registered.');
      }
      bcrypt.compare(password.trim(), user.password)
        .then(passwordIsValid => {
          if (passwordIsValid) {
            const token = jwt.sign({
              email,
              userId: user._id,
              username: user.username
            }, process.env.SECRET_STRING,
              {
                expiresIn: '1h'
              })
            res.status(200).json({
              token,
              email,
              userId: user._id,
              username: user.username
            })
          } else {
            return newError(next, 401, 'Invalid password');
          }
        })
    })
};