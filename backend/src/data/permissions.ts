import type { PermissionGroup } from '../types/index.js';

export const permissionGroups: PermissionGroup[] = [
  { resource: 'projects', actions: ['view', 'create', 'edit', 'delete', 'archive'] },
  { resource: 'tasks', actions: ['view', 'create', 'edit', 'delete', 'assign'] },
  { resource: 'members', actions: ['view', 'invite', 'remove', 'update-role'] },
  { resource: 'billing', actions: ['view', 'update', 'download-invoices'] },
  { resource: 'settings', actions: ['view', 'update'] },
];

export const allPermissions = permissionGroups.flatMap((group) =>
  group.actions.map((action) => `${group.resource}:${action}`),
);

export const permissionSet = new Set(allPermissions);
