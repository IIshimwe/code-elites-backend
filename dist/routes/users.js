"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = require("bcrypt");

var _lodash = require("lodash");

var _user = require("../models/user");

var _express = require("express");

const router = (0, _express.Router)();
router.post('/', async (req, res) => {
  const {
    error
  } = (0, _user.validate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await _user.User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already regisered');
  user = new _user.User((0, _lodash.pick)(req.body, ['name', 'email', 'password']));
  const salt = await (0, _bcrypt.genSalt)(10);
  user.password = await (0, _bcrypt.hash)(req.body.password, salt);
  user = await user.save();
  res.send((0, _lodash.pick)(user, ['name', 'email']));
});
var _default = router;
exports.default = _default;