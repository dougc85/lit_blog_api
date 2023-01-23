const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},
  { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema);