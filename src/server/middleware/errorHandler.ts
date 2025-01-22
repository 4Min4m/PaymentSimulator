import { Request, Response, NextFunction } from 'express';
import { TransactionError } from '../errors/TransactionError';
import { logger } from '../utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error occurred', { error });

  if (error instanceof TransactionError) {
    return res.status(400).json({ 
      error: true,
      message: error.message 
    });
  }

  return res.status(500).json({ 
    error: true,
    message: 'Internal server error'
  });
};