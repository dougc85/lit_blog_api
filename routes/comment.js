const express = require('express');
var router = express.Router({ mergeParams: true });

const protectRoute = require('../utilities/protectRoute');
const checkAuth = require('../utilities/checkAuth');

const {
  postComment,
  deleteComment
} = require('../controllers/commentController');

router.post("/", checkAuth, postComment);
router.delete("/:commentId", protectRoute, deleteComment);

module.exports = router;