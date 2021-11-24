const { Schema, model } = require('mongoose');
const shortId = require('shortid');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  _id: {
    type: String,
    default: shortId.generate,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
});

userSchema.virtual('password').get(function () {
  return this.hashedPassword;
});

userSchema.virtual('password').set(function () {
  const salt = bcrypt.genSaltSync(10);
  this.hashedPassword = bcrypt.hashSync(plainText, salt);
});

module.exports = model('User', userSchema)
