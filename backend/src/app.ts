import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { errorHandler } from './middleware/error-handler.js';
import { permissionsRouter } from './routes/permissions.routes.js';
import { rolesRouter } from './routes/roles.routes.js';
import { usersRouter } from './routes/users.routes.js';

export const app = express();
const frontendDistPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../frontend/dist');

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: express.Request, response: express.Response) => {
  response.json({ status: 'ok' });
});

app.use('/api/permissions', permissionsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);

app.use(express.static(frontendDistPath, { index: false }));

app.get('*', async (_request, response, next) => {
  try {
    const indexHtml = await readFile(resolve(frontendDistPath, 'index.html'), 'utf8');
    response.type('html').send(indexHtml);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
