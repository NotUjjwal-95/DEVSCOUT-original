import { env } from './config/env.ts';
import { createApp } from './app.ts';

const app = createApp();

const server = app.listen(env.PORT, '0.0.0.0', () => {
  console.log(
    `[DEVSCOUT] Backend listening on http://0.0.0.0:${env.PORT} (env: ${env.NODE_ENV})`
  );
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `[DEVSCOUT] Startup Error: Port ${env.PORT} is already in use. Set a different PORT environment variable.`
    );
  } else {
    console.error('[DEVSCOUT] Server startup error:', err);
  }
  process.exit(1);
});

let isShuttingDown = false;

function shutdown(signal: NodeJS.Signals): void {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  console.log(`[DEVSCOUT] Received ${signal}. Shutting down gracefully...`);

  server.close((err) => {
    if (err) {
      console.error('[DEVSCOUT] Error while closing HTTP server:', err);
      process.exit(1);
    }
    console.log('[DEVSCOUT] HTTP server closed cleanly.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('[DEVSCOUT] Forced shutdown after timeout.');
    process.exit(1);
  }, 10_000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
