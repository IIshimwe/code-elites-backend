import { pick } from 'lodash';
import { Querie, validate } from '../models/query';
import express from 'express';
import auth from '../middlewares/auth';
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const query = new Querie(pick(req.body, ['fullname', 'email', 'msg']));
    await query.save();

    res.json(query);
});

router.get('/', auth, async (req, res) => {
    const queries = await Querie.find();
    res.json(queries);
});

router.get('/:id', auth, async (req, res) => {
    const query = await Querie.findById(req.params.id);
    if (!query) return res.status(404).json({ message: 'Sorry! Message with the given ID was not found.' });

    res.json(query);
});

router.delete('/:id', auth, async (req, res) => {
    const query = await Querie.findByIdAndRemove(req.params.id);
    if (!query) return res.status(404).json({ message: 'Sorry! Message with the given ID was not found.' });

    res.json(query);
});

export default router;