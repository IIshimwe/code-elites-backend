"use strict";

var _articles = _interopRequireDefault(require("../routes/articles"));

var _queries = _interopRequireDefault(require("../routes/queries"));

var _auth = _interopRequireDefault(require("../routes/auth.js"));

var _users = _interopRequireDefault(require("../routes/users.js"));

var _express = require("express");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.use((0, _express.json)());
  app.use((0, _cookieParser.default)()); // Articles endpoints

  app.use('/api/blogs', _articles.default); // Queries endpoint

  app.use('/contact', _queries.default); // Authentication endpoints

  app.use('/api/users', _users.default);
  app.use('/api/auth', _auth.default);
};