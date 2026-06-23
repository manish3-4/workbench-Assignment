import { Badge } from '../../components/Badge';
import { titleCase, groupPermissionIds } from '../../lib/format';
import type { PermissionGroup } from '../../types';

interface PermissionBadgesProps {
  permissionIds: string[];
  groups: PermissionGroup[];
}

export function PermissionBadges({ permissionIds, groups }: PermissionBadgesProps) {
  const grouped = groupPermissionIds(permissionIds, groups);

  if (permissionIds.length === 0) {
    return <p className="text-sm text-slate-500">No permissions selected.</p>;
  }

  return (
    <div className="space-y-4">
      {Array.from(grouped.entries()).map(([resource, actions]) => (
        <div key={resource}>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{titleCase(resource)}</h4>
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => (
              <Badge key={`${resource}:${action}`}>{titleCase(action)}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
