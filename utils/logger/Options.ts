import { LoggerOptions } from 'pino';
import config from 'config';
import env from '../../env';
import packageJson from '../../package.json';

class Options implements LoggerOptions {
  name = packageJson.name;
  level = config.get('logger.level') as string;
  prettyPrint = !env.isProduction;
}

export default Options;
