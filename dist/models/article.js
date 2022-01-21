"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Article = void 0;
exports.validate = validateBlog;

var _joi = _interopRequireDefault(require("joi"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const articleSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255
  },
  // img:
  // {
  //     data: Buffer,
  //     contentType: String
  // },
  author: {
    type: String,
    required: true,
    maxlength: 50
  },
  content: {
    type: String,
    required: true,
    maxlength: 1024
  }
}, {
  timestamps: true
});

const Article = _mongoose.default.model('Article', articleSchema);

exports.Article = Article;

function validateBlog(article) {
  const schema = {
    title: _joi.default.string().min(10).max(255).required(),
    author: _joi.default.string().min(5).max(50).required(),
    content: _joi.default.string().min(10).max(1024).required()
  };
  return _joi.default.validate(article, schema);
}