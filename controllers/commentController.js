const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const newError = require('../utilities/newError');
const nextError = require('../utilities/nextError');

exports.postComment = (req, res, next) => {
  const {
    name,
    body
  } = req.body;

  if (!name || !body) {
    return newError(next, 422, 'Validation failed. Name and body fields must not be empty.');
  }

  if (name.toLowerCase() === 'doug' && req.userId !== process.env.USER_ID) {
    return newError(next, 422, 'Validation failed. Name cannot be "Doug" in any capitalized form');
  }

  const comment = new Comment({
    name: (req.userId === process.env.USER_ID ? 'doug' : name.trim()),
    body: body.trim(),
    user: (req.userId === process.env.USER_ID ? process.env.USER_ID : process.env.ANONYMOUS_ID),
  })

  let newComment;

  comment.save()
    .then(result => {
      newComment = result;

      const userPromise = User.findByIdAndUpdate(process.env.ANONYMOUS_ID, {
        $push: {
          "comments": result._id,
        }
      })

      const postPromise = Post.findByIdAndUpdate(req.params.postId, {
        $push: {
          "comments": result._id,
        }
      })

      return Promise.all([userPromise, postPromise]);
    })
    .then(result => {
      res.status(201).json({
        message: 'Comment successfully created',
        post: newComment,
      })
    })
    .catch(nextError(next))
}

exports.deleteComment = (req, res, next) => {

  Post.findOneAndUpdate({
    _id: req.params.postId,
    creator: req.userId,
  }, {
    $pull: {
      "comments": req.params.commentId,
    }
  })
    .then(result => {
      if (!result) {
        newError(next, 401, "Not authorized to delete this comment. Only the creator on the comment's parent post may delete a comment");
      } else {
        const commentPromise = Comment.findByIdAndDelete(req.params.commentId);

        const userPromise = User.findByIdAndUpdate(process.env.ANONYMOUS_ID, {
          $pull: {
            "comments": req.params.commentId,
          }
        })
        Promise.all([commentPromise, userPromise])
          .then(results => {
            res.status(200).json({
              message: 'Comment successfully deleted',
              post: results[0],
            })
          })
          .catch(nextError(next));
      }
    })
    .catch(nextError(next));


}