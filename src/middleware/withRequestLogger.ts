// src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const message = `${method} ${url}`;
  logger.info(message);
  next();
};

export default requestLogger;
