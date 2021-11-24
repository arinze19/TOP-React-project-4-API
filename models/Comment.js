const { Schema, model } = require('mongoose');
const shortId = require('shortid');

const commentSchema = new Schema({
  _id: {
    type: String,
    default: shortId.generate,
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('Comment', commentSchema);
