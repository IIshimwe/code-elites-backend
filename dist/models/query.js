"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Querie = void 0;
exports.validate = validateContactMe;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contactSchema = new _mongoose.default.Schema({
  fullname: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  msg: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

const Querie = _mongoose.default.model('Querie', contactSchema);

exports.Querie = Querie;

function validateContactMe(userQuery) {
  const schema = {
    fullname: _joi.default.string().min(5).max(255).required(),
    email: _joi.default.string().min(5).max(50).required().email(),
    msg: _joi.default.string().max(500).required()
  };
  return _joi.default.validate(userQuery, schema);
}