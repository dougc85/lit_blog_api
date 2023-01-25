const express = require('express');
const router = express.Router();

const {
  postSignin
} = require('../controllers/authController');

router.post("/signin", postSignin);

module.exports = router;