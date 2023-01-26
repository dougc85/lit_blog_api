const express = require('express');
const router = express.Router();

const commentRoutes = require('../routes/comment');

const checkAuth = require('../utilities/checkAuth');
const protectRoute = require('../utilities/protectRoute');

const {
  getPosts,
  postPost,
  getPost,
  editPost,
  deletePost,
} = require('../controllers/PostController');


router.get("/", checkAuth, getPosts);
router.post("/", postPost);

router.get("/:postId", checkAuth, getPost);
router.patch("/:postId", protectRoute, editPost);
router.delete("/:postId", deletePost);

router.use("/:postId/comments", commentRoutes);

module.exports = router;