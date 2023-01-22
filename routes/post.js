const express = require('express');
const router = express.Router();

const {
  getPost,
  editPost,
  postComment,
  deletePost,
} = require('../controllers/PostController');

router.get("/", getPost);
router.patch("/", editPost);
router.delete("/", deletePost);

router.post("/", postComment);

module.exports = router;