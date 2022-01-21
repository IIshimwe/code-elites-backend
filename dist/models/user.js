"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
exports.validate = validateUser;

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function () {
  return _jsonwebtoken.default.sign({
    _id: this._id
  }, process.env.CAPSTONE_SECRET_KEY);
};

const User = _mongoose.default.model('User', userSchema);

exports.User = User;

function validateUser(user) {
  const schema = {
    name: _joi.default.string().min(5).max(50).required(),
    email: _joi.default.string().min(5).max(255).required().email(),
    password: _joi.default.string().min(5).max(255).required()
  };
  return _joi.default.validate(user, schema);
}