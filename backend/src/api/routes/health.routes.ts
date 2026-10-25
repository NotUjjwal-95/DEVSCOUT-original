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

healthRouter.get('/db', async (_req: Request, res: Response) => {
  let client: PoolClient | undefined;
  try {
    client = await pool.connect();
    const result = await client.query<{ database_time: Date | string }>(
      'SELECT NOW() AS database_time'
    );
    const rawTime = result.rows[0]?.database_time;
    const databaseTime =
      rawTime instanceof Date ? rawTime.toISOString() : String(rawTime ?? '');

    res.json({
      status: 'ok',
      database: 'connected',
      database_time: databaseTime,
    });
  } catch {
    console.error('[DEVSCOUT Database] Health check query failed.');
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
