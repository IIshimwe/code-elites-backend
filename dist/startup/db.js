"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("dotenv/config");

var _mongoose = require("mongoose");

function _default() {
  (0, _mongoose.connect)(process.env.db).then(() => console.log('Connected to mongoDB')).catch(err => console.error('Could not connect to MongoDB...', err));
}