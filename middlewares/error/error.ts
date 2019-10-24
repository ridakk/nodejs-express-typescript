import { logger } from '../../utils';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err);
  res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
};
