import { pick } from 'lodash';
import { Querie, validate } from '../models/query';
import express from 'express';
import autho from '../middlewares/autho';
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const query = new Querie(pick(req.body, ['fullname', 'email', 'msg']));
    await query.save();

    res.send('Message has been sent');
});

router.get('/', autho, async (req, res) => {
    const queries = await Querie.find();
    res.send(queries);
});

router.get('/:id', autho, async (req, res) => {
    const query = await Querie.findById(req.params.id);
    if (!query) return res.status(404).send('Sorry! Message with the given ID was not found.');

    res.send(query);
});

router.delete('/:id', autho, async (req, res) => {
    const query = await Querie.findByIdAndRemove(req.params.id);
    if (!query) return res.status(404).send('Sorry! Message with the given ID was not found.');

    res.send('Message deleted successfully');
});

export default router;