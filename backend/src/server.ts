import 'dotenv/config';
import { createApp } from './app.ts';

const PORT = Number(process.env.PORT) || 3000;
const app = createApp();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`DEVSCOUT-V3 Backend listening on http://0.0.0.0:${PORT}`);
});
