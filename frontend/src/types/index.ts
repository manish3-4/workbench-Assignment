export type ResourceKey = 'projects' | 'tasks' | 'members' | 'billing' | 'settings';

export interface PermissionGroup {
  resource: ResourceKey;
  actions: string[];
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  roleIds: string[];
  roles: Role[];
}

export interface EffectivePermissionsResponse {
  userId: string;
  permissions: string[];
}

export interface RoleInput {
  name: string;
  permissions: string[];
}
