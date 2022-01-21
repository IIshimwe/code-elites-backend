"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _lodash = require("lodash");

var _user = require("../models/user");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

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
  const salt = await _bcrypt.default.genSalt(10);
  user.password = await _bcrypt.default.hash(req.body.password, salt);
  user = await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send((0, _lodash.pick)(user, ['name', 'email']));
});
var _default = router;
exports.default = _default;