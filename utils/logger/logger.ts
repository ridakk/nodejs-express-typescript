import pino from 'pino';
import Options from './Options';

const logger = pino(new Options());

export default logger;
