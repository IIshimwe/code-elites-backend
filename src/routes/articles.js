import auth from '../middlewares/auth';
import { pick } from 'lodash';
import { Article, validate } from '../models/article';
import express from 'express';
const router = express.Router();
import multer from 'multer';

// const storage = multer.diskStorage({});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true);
//     } else {
//         cb('invalid image file!', false);
//     }
// };
// const uploads = multer({ storage, fileFilter });

// uploads.single('articleImage'),

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let article = await Article.findOne({ title: req.body.title });
    if (article) return res.status(400).send('Article already regisered');

    article = new Article(pick(req.body, ['title', 'author', 'content']));
    await article.save();

    res.json(article);
});

router.get('/', async (req, res) => {
    const articles = await Article.find();

    res.json(articles);
});

router.get('/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).send('The article with the given ID was not found.');

    res.json(article);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const article = await Article.findByIdAndUpdate(req.params.id, pick(req.body, ['title', 'content']), {
        new: true
    });

    if (!article) return res.status(404).send('The article with the given ID was not found.');

    res.json(article);
});

router.delete('/:id', auth, async (req, res) => {
    const article = await Article.findByIdAndRemove(req.params.id);

    if (!article) return res.status(404).send('The article with the given ID was not found.');

    res.json(article);
});

export default router;