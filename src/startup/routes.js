import articles from '../routes/articles';
import query from '../routes/queries';
import auth from '../routes/auth.js';
import users from '../routes/users.js';
import { json } from 'express';
import cookieParser from 'cookie-parser';

module.exports = function (app) {
    app.use(json());
    app.use(cookieParser());

    // Articles endpoints
    app.use('/blogs', articles);
    // Queries endpoint
    app.use('/contact', query);

    // Authentication endpoints
    app.use('/users', users);
    app.use('/auth', auth);
};