import { allPermissions, permissionGroups, permissionSet } from '../../data/permissions.js';

export function listPermissionGroups() {
  return permissionGroups;
}

export function validatePermissionIds(permissions: string[]) {
  return permissions.filter((permission) => !permissionSet.has(permission));
}

export function listAllPermissions() {
  return allPermissions;
}
