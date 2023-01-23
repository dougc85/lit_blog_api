const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  imageURL: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  published: {
    type: Boolean,
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }]
},
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema);