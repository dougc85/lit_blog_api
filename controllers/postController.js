const Post = require('../models/post');

const nextError = require('../utilities/nextError');
const newError = require('../utilities/newError');

exports.getPosts = (req, res, next) => {
  Post
    .find({ creator: "63cb69a0922a8edb3bf5a574", published: true })
    .sort('-createdAt')
    .limit(10)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(nextError(next));
}

exports.postPost = (req, res, next) => {
  const {
    title,
    body,
    imageURL
  } = req.body;

  if (!title || !body) {
    return newError(next, 422, 'Validation failed. Title and body fields must not be empty.');
  }

  const post = new Post({
    title: title.trim(),
    imageURL: (imageURL ? imageURL.trim() : null),
    body: body.trim(),
    creator: process.env.USER_ID,
    published: true,
  })

  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post successfully created',
        post: result,
      })
    })
    .catch(nextError(next))
}

exports.getPost = (req, res, next) => {

  console.log(req.url, 'url');

  Post.findById(req.params.postId)
    .then(post => {

      if (!post) {
        return newError(next, 404, 'Post with that ID not found');
      }
      res.status(200).json(post);
    })
    .catch(nextError(next));
}

exports.editPost = (req, res, next) => {

}

exports.deletePost = (req, res, next) => {

}

exports.postComment = (req, res, next) => {

}