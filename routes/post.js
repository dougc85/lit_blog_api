const express = require('express');
const router = express.Router();

const {
  getPosts,
  postPost,
  getPost,
  editPost,
  postComment,
  deletePost,
} = require('../controllers/PostController');


router.get("/", getPosts);
router.post("/", postPost);

router.get("/:postId", getPost);
router.patch("/:postId", editPost);
router.delete("/:postId", deletePost);

router.post("/", postComment);

module.exports = router;