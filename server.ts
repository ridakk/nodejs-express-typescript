import './env'; // initiate dot env
import config from 'config';
import app from './app';
import { logger } from './utils';

const port = config.get('port');

app.listen(port, () => {
  logger.info(`App listening on the port ${port}`);
});
