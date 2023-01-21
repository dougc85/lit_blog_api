const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bcrypt = require('bcryptjs');

const app = express();
const mongoDB = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    let port = process.env.PORT || '3000';
    app.listen(port);
  })
  .catch((err) => {
    console.log('Cannot connect to DB');
  })