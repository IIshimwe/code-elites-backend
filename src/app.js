import('dotenv/config');
import('express-async-errors');
import cors from 'cors';
import express from 'express';
import routes from './startup/routes';
import db from './startup/db';

const app = express();
app.use(cors());
routes(app);
db();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening to port: ${port}...`));