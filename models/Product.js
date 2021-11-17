const { Schema, model } = require('mongoose');
const shortId = require('shortid');

const productSchema = new Schema({
  _id: {
    type: String,
    default: shortId.generate,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availableSizes: [
    {
      type: Number,
    },
  ],
  imagesUrl: [
    {
      type: String,
      required: true,
    },
  ],
  comments: [
    {
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
    },
  ],
});

module.exports = model('Product', productSchema);
