"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _autho = _interopRequireDefault(require("../middlewares/autho"));

var _lodash = require("lodash");

var _article = require("../models/article");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/', _autho.default, async (req, res) => {
  const {
    error
  } = (0, _article.validate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let article = await _article.Article.findOne({
    title: req.body.title
  });
  if (article) return res.status(400).send('Article already regisered');
  article = new _article.Article((0, _lodash.pick)(req.body, ['title', 'author', 'content']));
  await article.save();
  res.send('Article created successfully');
});
router.get('/', async (req, res) => {
  const articles = await _article.Article.find();
  res.send(articles);
});
router.get('/:id', async (req, res) => {
  const article = await _article.Article.findById(req.params.id);
  if (!article) return res.status(404).send('The article with the given ID was not found.');
  res.send(article);
});
router.put('/:id', _autho.default, async (req, res) => {
  const {
    error
  } = (0, _article.validate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const article = await _article.Article.findByIdAndUpdate(req.params.id, (0, _lodash.pick)(req.body, ['title', 'content']), {
    new: true
  });
  if (!article) return res.status(404).send('The article with the given ID was not found.');
  res.send('Article updated successfully');
});
router.delete('/:id', _autho.default, async (req, res) => {
  const article = await _article.Article.findByIdAndRemove(req.params.id);
  if (!article) return res.status(404).send('The article with the given ID was not found.');
  res.send('Article deleted successfully');
});
var _default = router;
exports.default = _default;