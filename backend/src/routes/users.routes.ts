import { Router } from 'express';
import {
  assignRoleToUser,
  getEffectivePermissions,
  listUsers,
  removeRoleFromUser,
} from '../modules/users/users.service.js';
import { assignRoleSchema } from '../modules/users/users.schemas.js';

export const usersRouter = Router();

usersRouter.get('/', (_request, response) => {
  response.json(listUsers());
});

usersRouter.post('/:id/roles', (request, response, next) => {
  try {
    const input = assignRoleSchema.parse(request.body);
    response.json(assignRoleToUser(request.params.id, input.roleId));
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:id/roles/:roleId', (request, response, next) => {
  try {
    response.json(removeRoleFromUser(request.params.id, request.params.roleId));
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id/effective-permissions', (request, response, next) => {
  try {
    response.json(getEffectivePermissions(request.params.id));
  } catch (error) {
    next(error);
  }
});
