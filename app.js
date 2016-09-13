import express from 'express';
import bodyParser from 'body-parser';
import datasource from './config/datasource';
import config from './config/config';
import booksRouter from './routes/books';
import usersRouter from './routes/users';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParser.json());
booksRouter(app);
usersRouter(app);

export default app;
