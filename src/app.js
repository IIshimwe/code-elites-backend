require('dotenv/config');
import('express-async-errors');

import express from 'express';
const app = express();

require('./startup/routes')(app);
require('./startup/db')();


const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port: ${port}...`));