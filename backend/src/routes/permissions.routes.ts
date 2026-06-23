import { Router } from 'express';
import { listPermissionGroups } from '../modules/permissions/permissions.service.js';

export const permissionsRouter = Router();

permissionsRouter.get('/', (_request, response) => {
  response.json(listPermissionGroups());
});
