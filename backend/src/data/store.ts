import { allPermissions } from './permissions.js';
import type { Role, User } from '../types/index.js';

const now = new Date().toISOString();

const adminPermissions = allPermissions.filter((permission) => permission !== 'billing:update');

export const roles: Role[] = [
  {
    id: 'role-owner',
    name: 'Owner',
    permissions: allPermissions,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'role-admin',
    name: 'Admin',
    permissions: adminPermissions,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'role-member',
    name: 'Member',
    permissions: [
      'projects:view',
      'projects:create',
      'projects:edit',
      'tasks:view',
      'tasks:create',
      'tasks:edit',
      'tasks:assign',
      'members:view',
    ],
    createdAt: now,
    updatedAt: now,
  },
  {
    id: 'role-viewer',
    name: 'Viewer',
    permissions: ['projects:view', 'tasks:view', 'members:view', 'billing:view', 'settings:view'],
    createdAt: now,
    updatedAt: now,
  },
];

export const users: User[] = [
  { id: 'user-sarah', name: 'Sarah Johnson', roleIds: ['role-owner'] },
  { id: 'user-alex', name: 'Alex Chen', roleIds: ['role-admin', 'role-member'] },
  { id: 'user-priya', name: 'Priya Singh', roleIds: ['role-member'] },
  { id: 'user-john', name: 'John Carter', roleIds: ['role-viewer'] },
];
