import { Plus, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { useRoles, useUserRoleMutations } from '../../hooks/useRbacQueries';
import { useUiStore } from '../../store/uiStore';
import type { User } from '../../types';

interface UserRoleManagerProps {
  user: User;
}

export function UserRoleManager({ user }: UserRoleManagerProps) {
  const { data: roles = [] } = useRoles();
  const close = useUiStore((state) => state.closeUserRoleModal);
  const [query, setQuery] = useState('');
  const { assignRole, removeRole } = useUserRoleMutations();
  const assigned = new Set(user.roleIds);

  const availableRoles = useMemo(
    () =>
      roles.filter(
        (role) => !assigned.has(role.id) && role.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [assigned, query, roles],
  );

  return (
    <Modal title={`Manage Roles for ${user.name}`} subtitle="Add or remove multiple roles without leaving the user table." onClose={close}>
      <div className="space-y-5">
        <section>
          <h3 className="mb-3 text-sm font-semibold text-ink">Assigned Roles</h3>
          {user.roles.length === 0 ? (
            <p className="text-sm text-slate-500">This user has no roles assigned.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.roles.map((role) => (
                <Badge key={role.id} className="gap-2">
                  {role.name}
                  <button
                    type="button"
                    onClick={() => removeRole.mutate({ userId: user.id, roleId: role.id })}
                    className="rounded-full text-slate-400 hover:text-red-600"
                    aria-label={`Remove ${role.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </section>

        <section>
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 w-full rounded-md border border-line bg-white pl-9 pr-3 text-sm"
              placeholder="Search roles to add"
            />
          </label>

          <div className="mt-3 divide-y divide-line rounded-lg border border-line">
            {availableRoles.length === 0 ? (
              <p className="p-4 text-sm text-slate-500">No available roles match this search.</p>
            ) : (
              availableRoles.map((role) => (
                <div key={role.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-medium text-ink">{role.name}</p>
                    <p className="text-xs text-slate-500">{role.permissions.length} permissions</p>
                  </div>
                  <Button
                    variant="secondary"
                    icon={<Plus className="h-4 w-4" />}
                    onClick={() => assignRole.mutate({ userId: user.id, roleId: role.id })}
                  >
                    Add
                  </Button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </Modal>
  );
}
