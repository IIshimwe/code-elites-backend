import Joi from 'joi';
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    msg: {
        type: String,
        maxlength: 500
    }
}, { timestamps: true });

const Querie = mongoose.model('Querie', contactSchema);

function validateContactMe(userQuery) {
    const schema = {
        fullname: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(50).required().email(),
        msg: Joi.string().max(500).required()
    };

    return Joi.validate(userQuery, schema);
}

export { Querie, validateContactMe as validate };