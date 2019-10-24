import { logger } from '../../utils';
import { Request, Response } from 'express';

export default (req: Request, res: Response): void => {
  logger.debug(`unmatched URL: ${req.method} ${req.path}`);
  res.status(404).json({
    status: 404,
    message: 'api not found',
  });
};
