require('dotenv/config');
import { connect } from 'mongoose';

module.exports = function () {
    connect(process.env.db)
        .then(() => console.log('Connected to mongoDB'))
        .catch(err => console.error('Could not connect to MongoDB...', err));

};