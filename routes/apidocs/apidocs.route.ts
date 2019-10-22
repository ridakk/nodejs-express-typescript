import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from 'config';
import Route from '../route.interface';
import pjson from '../../package.json';

const port = config.get('port');

const swaggerDefinition = {
  info: {
    // API informations (required)
    title: pjson.name,
    version: pjson.version,
    description: pjson.description,
  },
  host: `localhost:${port}`, // Host (optional)
  basePath: '/', // Base path (optional)
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['**/*.ts'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

class TestRoute implements Route {
  public path = '/api-docs';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(this.path, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

export default TestRoute;
