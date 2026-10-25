import { Router } from 'express';
import type { Request, Response } from 'express';
import type { PoolClient } from 'pg';
import { pool } from '../../database/pool.ts';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'DEVSCOUT Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

function resolveDatabaseTimestamp(rawTime: unknown): string {
  if (rawTime instanceof Date) {
    if (Number.isNaN(rawTime.getTime())) {
      throw new Error('Invalid Date instance returned for database_time.');
    }
    return rawTime.toISOString();
  }

  if (typeof rawTime === 'string' && rawTime.trim().length > 0) {
    const parsed = new Date(rawTime);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  }

  throw new Error('Missing or invalid database_time value in query result.');
}

healthRouter.get('/db', async (_req: Request, res: Response) => {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.query<{ database_time: unknown }>(
      'SELECT NOW() AS database_time'
    );
    const rawTime = result.rows[0]?.database_time;
    const databaseTime = resolveDatabaseTimestamp(rawTime);

    res.json({
      status: 'ok',
      database: 'connected',
      database_time: databaseTime,
    });
  } catch (err: unknown) {
    const safeMessage =
      err instanceof Error && err.message.trim().length > 0
        ? err.message
        : 'Unknown database error';
    console.error('[DEVSCOUT Database] Health check query failed:', safeMessage);

    res.status(503).json({
      status: 'error',
      error: {
        code: 'DATABASE_UNAVAILABLE',
        message: 'Database connectivity check failed.',
      },
      timestamp: new Date().toISOString(),
    });
  } finally {
    client?.release();
  }
});
