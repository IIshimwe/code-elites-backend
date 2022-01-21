"use strict";

var _mongoose = require("mongoose");

require('dotenv/config');

module.exports = function () {
  (0, _mongoose.connect)(process.env.db).then(() => console.log('Connected to mongoDB')).catch(err => console.error('Could not connect to MongoDB...', err));
};