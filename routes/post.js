const express = require('express');
const router = express.Router();

const commentRoutes = require('../routes/comment');

const {
  getPosts,
  postPost,
  getPost,
  editPost,
  deletePost,
} = require('../controllers/PostController');


router.get("/", getPosts);
router.post("/", postPost);

router.get("/:postId", getPost);
router.patch("/:postId", editPost);
router.delete("/:postId", deletePost);

router.use("/:postId/comments", commentRoutes);

module.exports = router;