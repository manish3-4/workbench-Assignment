import { users } from '../../data/store.js';
import type { UserWithRoles } from '../../types/index.js';
import { getRoleById } from '../roles/roles.service.js';

function getUserOrThrow(id: string) {
  const user = users.find((candidate) => candidate.id === id);
  if (!user) {
    const error = new Error('User not found.');
    error.name = 'NotFoundError';
    throw error;
  }
  return user;
}

export function listUsers(): UserWithRoles[] {
  return users.map((user) => ({
    ...user,
    roles: user.roleIds.map((roleId) => getRoleById(roleId)).filter((role) => role !== undefined),
  }));
}

export function assignRoleToUser(userId: string, roleId: string): UserWithRoles {
  const user = getUserOrThrow(userId);
  const role = getRoleById(roleId);
  if (!role) {
    const error = new Error('Role not found.');
    error.name = 'NotFoundError';
    throw error;
  }

  if (!user.roleIds.includes(roleId)) {
    user.roleIds.push(roleId);
  }

  return listUsers().find((candidate) => candidate.id === userId) as UserWithRoles;
}

export function removeRoleFromUser(userId: string, roleId: string): UserWithRoles {
  const user = getUserOrThrow(userId);
  user.roleIds = user.roleIds.filter((assignedRoleId) => assignedRoleId !== roleId);
  return listUsers().find((candidate) => candidate.id === userId) as UserWithRoles;
}

export function getEffectivePermissions(userId: string) {
  const user = getUserOrThrow(userId);
  const permissions = new Set<string>();
  user.roleIds.forEach((roleId) => {
    const role = getRoleById(roleId);
    role?.permissions.forEach((permission) => permissions.add(permission));
  });

  return {
    userId,
    permissions: Array.from(permissions).sort(),
  };
}
