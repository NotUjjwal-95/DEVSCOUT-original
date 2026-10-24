import express from 'express';
import { env } from './config/env.ts';
import { apiRouter } from './api/routes/index.ts';
import {
  securityHeadersMiddleware,
  createCorsMiddleware,
} from './middleware/security.middleware.ts';
import { requestLoggerMiddleware } from './middleware/logger.middleware.ts';
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from './middleware/error.middleware.ts';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');

  app.use(securityHeadersMiddleware);
  app.use(createCorsMiddleware(env.CORS_ORIGIN));
  app.use(requestLoggerMiddleware);

  app.use(express.json({ limit: env.REQUEST_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: true, limit: env.REQUEST_BODY_LIMIT }));

  app.use('/api', apiRouter);

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
}

export default createApp;
