import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Logs incoming HTTP requests and their completion status and latency.
 */
export const requestLoggerMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const durationNs = process.hrtime.bigint() - startTime;
    const durationMs = (Number(durationNs) / 1_000_000).toFixed(2);
    const timestamp = new Date().toISOString();

    console.log(
      `[${timestamp}] [DEVSCOUT] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`
    );
  });

  next();
};
