import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import { permissionsRouter } from './routes/permissions.routes.js';
import { rolesRouter } from './routes/roles.routes.js';
import { usersRouter } from './routes/users.routes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: express.Request, response: express.Response) => {
  response.json({ status: 'ok' });
});

app.use('/api/permissions', permissionsRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);
