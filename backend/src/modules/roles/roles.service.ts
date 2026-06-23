import { randomUUID } from 'node:crypto';
import { roles, users } from '../../data/store.js';
import type { Role } from '../../types/index.js';
import { validatePermissionIds } from '../permissions/permissions.service.js';
import type { RoleInput } from './roles.schemas.js';

function findRoleIndex(id: string) {
  return roles.findIndex((role) => role.id === id);
}

function ensureValidRoleInput(input: RoleInput, currentRoleId?: string) {
  const invalidPermissions = validatePermissionIds(input.permissions);
  if (invalidPermissions.length > 0) {
    const error = new Error(`Unknown permission IDs: ${invalidPermissions.join(', ')}`);
    error.name = 'ValidationError';
    throw error;
  }

  const duplicate = roles.find(
    (role) => role.name.toLowerCase() === input.name.toLowerCase() && role.id !== currentRoleId,
  );
  if (duplicate) {
    const error = new Error('A role with this name already exists.');
    error.name = 'ConflictError';
    throw error;
  }
}

export function listRoles() {
  return roles;
}

export function getRoleById(id: string) {
  return roles.find((role) => role.id === id);
}

export function createRole(input: RoleInput): Role {
  ensureValidRoleInput(input);
  const timestamp = new Date().toISOString();
  const role: Role = {
    id: randomUUID(),
    name: input.name,
    permissions: Array.from(new Set(input.permissions)),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  roles.push(role);
  return role;
}

export function updateRole(id: string, input: RoleInput): Role {
  const index = findRoleIndex(id);
  if (index === -1) {
    const error = new Error('Role not found.');
    error.name = 'NotFoundError';
    throw error;
  }

  ensureValidRoleInput(input, id);
  const updatedRole: Role = {
    ...roles[index],
    name: input.name,
    permissions: Array.from(new Set(input.permissions)),
    updatedAt: new Date().toISOString(),
  };
  roles[index] = updatedRole;
  return updatedRole;
}

export function deleteRole(id: string) {
  const index = findRoleIndex(id);
  if (index === -1) {
    const error = new Error('Role not found.');
    error.name = 'NotFoundError';
    throw error;
  }

  roles.splice(index, 1);
  users.forEach((user) => {
    user.roleIds = user.roleIds.filter((roleId) => roleId !== id);
  });
}
