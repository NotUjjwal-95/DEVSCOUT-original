import type { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { env } from '../config/env.ts';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    code = 'INTERNAL_SERVER_ERROR',
    details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

interface BodyParserSyntaxError extends SyntaxError {
  status?: number;
  statusCode?: number;
  type?: string;
  body?: unknown;
}

function isMalformedJsonError(err: unknown): err is BodyParserSyntaxError {
  if (!(err instanceof SyntaxError)) {
    return false;
  }
  const candidate = err as BodyParserSyntaxError;
  return (
    candidate.status === 400 ||
    candidate.statusCode === 400 ||
    candidate.type === 'entity.parse.failed' ||
    'body' in candidate
  );
}

function isPayloadTooLargeError(err: unknown): boolean {
  if (typeof err !== 'object' || err === null) {
    return false;
  }
  const candidate = err as { status?: number; statusCode?: number; type?: string };
  return (
    candidate.status === 413 ||
    candidate.statusCode === 413 ||
    candidate.type === 'entity.too.large'
  );
}

/**
 * Returns a consistent JSON 404 response for any unmatched route.
 */
export const notFoundMiddleware: RequestHandler = (
  req: Request,
  res: Response
): void => {
  res.status(404).json({
    status: 'error',
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `Cannot ${req.method} ${req.originalUrl}`,
    },
    timestamp: new Date().toISOString(),
  });
};

/**
 * Centralized JSON error handler that normalizes malformed JSON, oversized payloads,
 * AppErrors, and unexpected server exceptions without leaking stack traces in production.
 */
export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();

  if (isMalformedJsonError(err)) {
    res.status(400).json({
      status: 'error',
      error: {
        code: 'INVALID_JSON_PAYLOAD',
        message: 'Malformed JSON in request body.',
      },
      timestamp,
    });
    return;
  }

  if (isPayloadTooLargeError(err)) {
    res.status(413).json({
      status: 'error',
      error: {
        code: 'PAYLOAD_TOO_LARGE',
        message: `Request body exceeds maximum allowed size (${env.REQUEST_BODY_LIMIT}).`,
      },
      timestamp,
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
      timestamp,
    });
    return;
  }

  const unexpectedError = err instanceof Error ? err : new Error(String(err));
  console.error(`[${timestamp}] [DEVSCOUT Unhandled Error]`, unexpectedError);

  const isProd = env.NODE_ENV === 'production';
  res.status(500).json({
    status: 'error',
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isProd
        ? 'An unexpected internal server error occurred.'
        : unexpectedError.message || 'An unexpected internal server error occurred.',
    },
    timestamp,
  });
};
