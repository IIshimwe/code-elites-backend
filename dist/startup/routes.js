"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _articles = _interopRequireDefault(require("../routes/articles"));

var _queries = _interopRequireDefault(require("../routes/queries"));

var _auth = _interopRequireDefault(require("../routes/auth.js"));

var _users = _interopRequireDefault(require("../routes/users.js"));

var _express = require("express");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(app) {
  app.use((0, _express.json)());
  app.use((0, _cookieParser.default)()); // Articles endpoints

  app.use('/blogs', _articles.default); // Queries endpoint

  app.use('/contact', _queries.default); // Authentication endpoints

  app.use('/users', _users.default);
  app.use('/auth', _auth.default);
}