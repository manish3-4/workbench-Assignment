import type { PermissionGroup, ResourceKey } from '../types';

export function titleCase(value: string) {
  return value
    .split(/[-\s]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function groupPermissionIds(permissionIds: string[], groups: PermissionGroup[]) {
  const grouped = new Map<ResourceKey, string[]>();

  groups.forEach((group) => {
    const actions = group.actions.filter((action) => permissionIds.includes(`${group.resource}:${action}`));
    if (actions.length > 0) {
      grouped.set(group.resource, actions);
    }
  });

  return grouped;
}
