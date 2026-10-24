import { Router } from 'express';
import type { Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'DEVSCOUT Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});
