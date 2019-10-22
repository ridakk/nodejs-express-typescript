import { Router, Request, Response } from 'express';
import Route from '../route.interface';

class TestRoute implements Route {
  public path = '/test';
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.get);
  }

  /**
   * @swagger
   * /test:
   *   get:
   *     description: Returns the homepage
   *     responses:
   *       200:
   *         description: hello world
   */
  private get = async (request: Request, response: Response): Promise<void> => {
    response.status(200).send({
      message: 'ok',
    });
  };
}

export default TestRoute;
