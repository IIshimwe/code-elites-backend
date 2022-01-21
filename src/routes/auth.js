import('dotenv/config');
import Joi from 'joi';
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    if (!process.env.CAPSTONE_SECRET_KEY) {
        console.error('FATAL ERROR: secretKey is not defined');
        process.exit(1);
    }

    const token = user.generateAuthToken();
    res.send(token);
    // const maxAge = 3 * 60 * 60 * 24;
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // next();
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

export default router;