const Post = require('../models/post');

exports.getUser = (req, res, next) => {
  Post
    .find({ creator: "63cb69a0922a8edb3bf5a574", published: true })
    .sort('-createdAt')
    .limit(10)
    .then(posts => {
      console.log(posts);
    })
    .catch(err => {
      console.log(err);
    })
}