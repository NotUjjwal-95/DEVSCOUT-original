import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'DEVSCOUT-V3 Backend Intelligence Engine',
      version: '3.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  return app;
}

export default createApp;
