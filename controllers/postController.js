const Post = require('../models/post');
const nextError = require('../utilities/nextError');

exports.getPost = (req, res, next) => {
  Post.findById(req.params.postId)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(nextError(next));
}