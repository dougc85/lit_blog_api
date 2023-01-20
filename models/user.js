const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  posts: [{
    startingText: {
      type: String,
      required: true
    },
    numComments: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    published: {
      type: Boolean,
      required: true,
    }
  }],
  pwResetToken: String,
  pwResetTokenExp: Date,
});

module.exports = mongoose.model('User', userSchema);