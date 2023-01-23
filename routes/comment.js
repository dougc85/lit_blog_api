const express = require('express');
var router = express.Router({ mergeParams: true });

const {
  postComment,
  deleteComment
} = require('../controllers/commentController');

router.post("/", postComment);
router.delete("/:commentId", deleteComment);

module.exports = router;