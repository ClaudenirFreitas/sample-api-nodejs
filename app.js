import express from 'express';
import bodyParser from 'body-parser';
import datasource from './config/datasource';
import config from './config/config';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth'
import authorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);

export default app;
