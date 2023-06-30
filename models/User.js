const mongoose = require('mongoose');
var validator = require('validator');

const UserShcema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide name.'],
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide email.'],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: 'Please provide valid email'
    }
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please, provide your user password.'],
    minLength: 6,
    maxLength: 50
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

module.exports = mongoose.model('User', UserShcema);