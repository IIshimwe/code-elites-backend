"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = require("../models/user");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

Promise.resolve().then(() => _interopRequireWildcard(require('dotenv/config')));

const router = _express.default.Router();

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await _user.User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('Invalid email or password');
  const validPassword = await _bcrypt.default.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  if (!process.env.CAPSTONE_SECRET_KEY) {
    console.error('FATAL ERROR: secretKey is not defined');
    process.exit(1);
  }

  const token = user.generateAuthToken();
  res.send(token); // const maxAge = 3 * 60 * 60 * 24;
  // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
  // next();
});

function validate(req) {
  const schema = {
    email: _joi.default.string().min(5).max(255).required().email(),
    password: _joi.default.string().min(5).max(255).required()
  };
  return _joi.default.validate(req, schema);
}

var _default = router;
exports.default = _default;