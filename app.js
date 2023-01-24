const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const bcrypt = require('bcryptjs');

const postRoutes = require('./routes/post');

const app = express();
const mongoDB = process.env.MONGODB_URI;

app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// })

let corsOptions = {
  origin: ['http://localhost:3000'],
}

app.use(cors(corsOptions));

app.use("/posts", postRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
  })
})

mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    let port = process.env.PORT || '8080';
    app.listen(port);
  })
  .catch((err) => {
    console.log('Cannot connect to DB');
  })