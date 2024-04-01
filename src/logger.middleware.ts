// logging.middleware.ts

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const end = Date.now();
      const duration = end - start;
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${duration} ms`);
    });

    next();
  }
}
