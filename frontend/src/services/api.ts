import type { EffectivePermissionsResponse, PermissionGroup, Role, RoleInput, User } from '../types';

const API_BASE = '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(payload?.message ?? 'Request failed.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const api = {
  permissions: () => request<PermissionGroup[]>('/permissions'),
  roles: () => request<Role[]>('/roles'),
  createRole: (input: RoleInput) =>
    request<Role>('/roles', { method: 'POST', body: JSON.stringify(input) }),
  updateRole: (roleId: string, input: RoleInput) =>
    request<Role>(`/roles/${roleId}`, { method: 'PUT', body: JSON.stringify(input) }),
  deleteRole: (roleId: string) => request<void>(`/roles/${roleId}`, { method: 'DELETE' }),
  users: () => request<User[]>('/users'),
  assignRole: (userId: string, roleId: string) =>
    request<User>(`/users/${userId}/roles`, { method: 'POST', body: JSON.stringify({ roleId }) }),
  removeRole: (userId: string, roleId: string) =>
    request<User>(`/users/${userId}/roles/${roleId}`, { method: 'DELETE' }),
  effectivePermissions: (userId: string) =>
    request<EffectivePermissionsResponse>(`/users/${userId}/effective-permissions`),
};
