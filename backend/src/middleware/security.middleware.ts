import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { env } from '../config/env.ts';

/**
 * Sets baseline HTTP security headers on every response.
 */
export const securityHeadersMiddleware: RequestHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
};

/**
 * Enforces a restricted CORS policy using the configured allowlist of origins.
 */
export function createCorsMiddleware(
  allowedOrigins: ReadonlyArray<string> = env.CORS_ORIGIN
): RequestHandler {
  const allowAll = allowedOrigins.includes('*');

  return (req: Request, res: Response, next: NextFunction): void => {
    const requestOrigin = req.headers.origin;

    if (requestOrigin) {
      const isAllowed = allowAll || allowedOrigins.includes(requestOrigin);

      if (!isAllowed) {
        if (req.method === 'OPTIONS') {
          res.status(403).json({
            status: 'error',
            error: {
              code: 'CORS_ORIGIN_FORBIDDEN',
              message: `Origin "${requestOrigin}" is not permitted by CORS policy.`,
            },
          });
          return;
        }
        next();
        return;
      }

      res.setHeader(
        'Access-Control-Allow-Origin',
        allowAll ? '*' : requestOrigin
      );
      if (!allowAll) {
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Accept, X-Requested-With'
      );
      res.setHeader('Access-Control-Max-Age', '86400');
    }

    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }

    next();
  };
}
