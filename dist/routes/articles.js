"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _auth = _interopRequireDefault(require("../middlewares/auth"));

var _lodash = require("lodash");

var _article = require("../models/article");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // const storage = multer.diskStorage({});
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb('invalid image file!', false);
//     }
// };
// const uploads = multer({ storage, fileFilter });
// uploads.single('articleImage'),


router.post('/', _auth.default, async (req, res) => {
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
  res.json(article);
});
router.get('/', async (req, res) => {
  const articles = await _article.Article.find();
  res.json(articles);
});
router.get('/:id', async (req, res) => {
  const article = await _article.Article.findById(req.params.id);
  if (!article) return res.status(404).send('The article with the given ID was not found.');
  res.json(article);
});
router.put('/:id', _auth.default, async (req, res) => {
  const {
    error
  } = (0, _article.validate)(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const article = await _article.Article.findByIdAndUpdate(req.params.id, (0, _lodash.pick)(req.body, ['title', 'content']), {
    new: true
  });
  if (!article) return res.status(404).send('The article with the given ID was not found.');
  res.json(article);
});
router.delete('/:id', _auth.default, async (req, res) => {
  const article = await _article.Article.findByIdAndRemove(req.params.id);
  if (!article) return res.status(404).send('The article with the given ID was not found.');
  res.json(article);
});
var _default = router;
exports.default = _default;