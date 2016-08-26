import express from 'express';
import bodyParser from 'body-parser';
import datasource from './config/datasource';
import config from './config/config';
import booksRouter from './routes/books';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 7000);
app.use(bodyParser.json());
booksRouter(app);

export default app;
