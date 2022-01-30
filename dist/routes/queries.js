"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _query = require("../models/query");

var _express = _interopRequireDefault(require("express"));

var _auth = _interopRequireDefault(require("../middlewares/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', async (req, res) => {
  const {
    error
  } = (0, _query.validate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const query = new _query.Querie((0, _lodash.pick)(req.body, ['fullname', 'email', 'msg']));
  await query.save();
  res.json(query);
});
router.get('/', _auth.default, async (req, res) => {
  const queries = await _query.Querie.find();
  res.json(queries);
});
router.get('/:id', _auth.default, async (req, res) => {
  const query = await _query.Querie.findById(req.params.id);
  if (!query) return res.status(404).json({
    message: 'Sorry! Message with the given ID was not found.'
  });
  res.json(query);
});
router.delete('/:id', _auth.default, async (req, res) => {
  const query = await _query.Querie.findByIdAndRemove(req.params.id);
  if (!query) return res.status(404).json({
    message: 'Sorry! Message with the given ID was not found.'
  });
  res.json(query);
});
var _default = router;
exports.default = _default;