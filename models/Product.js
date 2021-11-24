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
      type: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  comments: [
    {
      type: String,
      ref: 'Comment',
    },
  ],
});

module.exports = model('Product', productSchema);
