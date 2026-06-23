import { Router } from 'express';
import { createRole, deleteRole, listRoles, updateRole } from '../modules/roles/roles.service.js';
import { roleInputSchema } from '../modules/roles/roles.schemas.js';

export const rolesRouter = Router();

rolesRouter.get('/', (_request, response) => {
  response.json(listRoles());
});

rolesRouter.post('/', (request, response, next) => {
  try {
    const input = roleInputSchema.parse(request.body);
    response.status(201).json(createRole(input));
  } catch (error) {
    next(error);
  }
});

rolesRouter.put('/:id', (request, response, next) => {
  try {
    const input = roleInputSchema.parse(request.body);
    response.json(updateRole(request.params.id, input));
  } catch (error) {
    next(error);
  }
});

rolesRouter.delete('/:id', (request, response, next) => {
  try {
    deleteRole(request.params.id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
