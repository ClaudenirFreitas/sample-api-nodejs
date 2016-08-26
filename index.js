import winston from 'winston';
import app from './app';

app.listen(app.get('port'), () => {
  winston.info(`Server running in port ${app.get('port')}`);
});
