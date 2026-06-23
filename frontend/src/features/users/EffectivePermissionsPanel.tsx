import { ShieldCheck } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { PermissionBadges } from '../permissions/PermissionBadges';
import { useEffectivePermissions, usePermissions } from '../../hooks/useRbacQueries';
import type { User } from '../../types';

interface EffectivePermissionsPanelProps {
  user?: User;
}

export function EffectivePermissionsPanel({ user }: EffectivePermissionsPanelProps) {
  const { data: groups = [] } = usePermissions();
  const { data, isLoading } = useEffectivePermissions(user?.id);

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-50 text-brand-700">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-ink">Effective Permissions</h2>
          <p className="text-sm text-slate-500">Resolved by union across assigned roles.</p>
        </div>
      </div>

      {!user ? (
        <p className="text-sm text-slate-500">Select a user to inspect their access.</p>
      ) : (
        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium text-ink">{user.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <Badge key={role.id}>{role.name}</Badge>
              ))}
            </div>
          </div>

          {isLoading ? (
            <p className="text-sm text-slate-500">Resolving permissions...</p>
          ) : (
            <PermissionBadges groups={groups} permissionIds={data?.permissions ?? []} />
          )}
        </div>
      )}
    </Card>
  );
}
