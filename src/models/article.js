import Joi from 'joi';
import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 255
    },
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // },
    author: {
        type: String,
        required: true,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        maxlength: 1024
    }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

function validateBlog(article) {
    const schema = {
        title: Joi.string().min(10).max(255).required(),
        author: Joi.string().min(5).max(50).required(),
        content: Joi.string().min(10).max(1024).required()
    };

    return Joi.validate(article, schema);
}

export { Article, validateBlog as validate };