const Post = require('../models/post');
const User = require('../models/user');

const nextError = require('../utilities/nextError');
const newError = require('../utilities/newError');

exports.getPosts = (req, res, next) => {

  if (req.userId === process.env.USER_ID) {
    Post
      .find({ creator: process.env.USER_ID })
      .sort('-createdAt')
      .limit(10)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(nextError(next));
  } else {
    Post
      .find({ creator: process.env.USER_ID, published: true })
      .sort('-createdAt')
      .limit(10)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(nextError(next));
  }

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

  let newPost;

  post.save()
    .then(result => {
      newPost = result;
      return User.findByIdAndUpdate(process.env.USER_ID, {
        $push: {
          "posts": result._id,
        }
      })
    })
    .then(result => {
      res.status(201).json({
        message: 'Post successfully created',
        post: newPost,
      })
    })
    .catch(nextError(next))
}

exports.getPost = (req, res, next) => {

  Post.findById(req.params.postId)
    .populate('comments')
    .then(post => {

      if (!post) {
        return newError(next, 404, 'Post with that ID not found');
      }
      if (!post.published && req.userId !== post.creator.toString()) {
        return newError(next, 403, 'Unauthorized');
      }
      res.status(200).json(post);
    })
    .catch(nextError(next));
}

exports.editPost = (req, res, next) => {
  const {
    title,
    imageURL,
    body,
    published,
  } = req.body;
  const postId = req.params.postId;

  if (typeof published === "boolean") {
    Post.findOneAndUpdate({
      _id: postId,
      creator: req.userId,
    }, {
      published: published ? true : false
    }, { new: true })
      .then(result => {
        res.status(200).json({
          message: 'Post successfully edited',
          post: result,
        })
      })
      .catch(nextError(next));
  } else if (!body || !title) {
    return newError(next, 422, 'Validation failed. Title and body fields must not be empty.');
  } else {
    Post.findOneAndUpdate({
      _id: postId,
      creator: req.userId
    }, {
      body: body.trim(),
      title: title.trim(),
      imageURL: (imageURL ? imageURL.trim() : null),
    }, { new: true })
      .then(result => {
        res.status(200).json({
          message: 'Post successfully edited',
          post: result,
        })
      })
      .catch(nextError(next));
  }
}

exports.deletePost = (req, res, next) => {

  const postPromise = Post.findOneAndDelete({
    _id: req.params.postId,
    creator: req.userId,
  });

  const userPromise = User.findOneAndUpdate({
    _id: req.userId
  }, {
    $pull: {
      "posts": req.params.postId,
    }
  })

  Promise.all([postPromise, userPromise])
    .then(results => {
      console.log(results, 'results')
      res.status(200).json({
        message: 'Post successfully deleted',
        post: results[0],
      })
    })
    .catch(nextError(next));
}