import { Router, Request, Response } from 'express';
import app from '../../app';
import Route from '../route.interface';

class TestRoute implements Route {
  public path = '/healthz';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.get);
  }

  /**
   * @swagger
   * /healthz:
   *   get:
   *     description: health check route
   *     responses:
   *       200:
   *         description: service is healthy
   *       503:
   *         description: service is shutting down
   */
  private get = async (request: Request, response: Response): Promise<void> => {
    const isShuttingDown = app.get('isShuttingDown');

    if (isShuttingDown) {
      response.status(503).send({
        message: 'ok',
      });
      return;
    }

    response.status(200).send({
      message: 'ok',
    });
  };
}

export default TestRoute;
