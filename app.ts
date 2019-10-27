import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import expressPinoLogger from 'express-pino-logger';
import { Nexit, NEXIT_SHUTDOWN } from 'nexit';
import { logger } from './utils';
import { error, notFound } from './middlewares';
import env from './env';

import routes from './routes';

const app = express();

app.use(expressPinoLogger({ logger: logger }));
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(bodyParser.json());
app.use(compression());

if (!env.isTest) {
  const nexit = new Nexit();

  nexit.on(NEXIT_SHUTDOWN, () => {
    app.set('isShuttingDown', true);
  });
}

routes.map(Route => {
  const route = new Route();
  app.use('/', route.router);
});

app.use(notFound);
app.use(error);

export default app;
