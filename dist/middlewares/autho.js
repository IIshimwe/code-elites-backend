"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function autho(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decodedPayload = _jsonwebtoken.default.verify(token, process.env.CAPSTONE_SECRET_KEY);

    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
}

var _default = autho;
exports.default = _default;