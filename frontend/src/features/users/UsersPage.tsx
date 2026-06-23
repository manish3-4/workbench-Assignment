import { Settings2 } from 'lucide-react';
import { useEffect } from 'react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Table } from '../../components/Table';
import { EffectivePermissionsPanel } from './EffectivePermissionsPanel';
import { UserRoleManager } from './UserRoleManager';
import { useEffectivePermissions, useUsers } from '../../hooks/useRbacQueries';
import { cn } from '../../lib/cn';
import { useUiStore } from '../../store/uiStore';
import type { User } from '../../types';

function EffectiveCount({ userId }: { userId: string }) {
  const { data, isLoading } = useEffectivePermissions(userId);
  return <span>{isLoading ? '...' : data?.permissions.length ?? 0}</span>;
}

export function UsersPage() {
  const { data: users = [], isLoading } = useUsers();
  const selectedUserId = useUiStore((state) => state.selectedUserId);
  const setSelectedUser = useUiStore((state) => state.setSelectedUser);
  const openUserRoleModal = useUiStore((state) => state.openUserRoleModal);
  const modalUser = useUiStore((state) => state.userRoleModal?.user);

  useEffect(() => {
    if (!selectedUserId && users[0]) {
      setSelectedUser(users[0].id);
    }
  }, [selectedUserId, setSelectedUser, users]);

  const selectedUser = users.find((user) => user.id === selectedUserId);
  const liveModalUser = modalUser ? users.find((user) => user.id === modalUser.id) ?? modalUser : undefined;

  if (isLoading) {
    return <div className="rounded-lg border border-line bg-white p-6 text-sm text-slate-500">Loading users...</div>;
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-ink">Users</h1>
        <p className="mt-1 text-sm text-slate-500">Assign overlapping roles and inspect resolved access instantly.</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Table headers={['Name', 'Assigned Roles', 'Effective Permissions', 'Actions']}>
          {users.map((user: User) => (
            <tr
              key={user.id}
              className={cn('cursor-pointer transition hover:bg-slate-50', selectedUserId === user.id && 'bg-brand-50/60')}
              onClick={() => setSelectedUser(user.id)}
            >
              <td className="whitespace-nowrap px-5 py-4 font-medium text-ink">{user.name}</td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {user.roles.map((role) => (
                    <Badge key={role.id}>{role.name}</Badge>
                  ))}
                </div>
              </td>
              <td className="whitespace-nowrap px-5 py-4 font-semibold text-ink">
                <EffectiveCount userId={user.id} />
              </td>
              <td className="whitespace-nowrap px-5 py-4">
                <Button
                  variant="secondary"
                  icon={<Settings2 className="h-4 w-4" />}
                  onClick={(event) => {
                    event.stopPropagation();
                    openUserRoleModal(user);
                  }}
                >
                  Manage Roles
                </Button>
              </td>
            </tr>
          ))}
        </Table>

        <EffectivePermissionsPanel user={selectedUser} />
      </div>

      {liveModalUser ? <UserRoleManager user={liveModalUser} /> : null}
    </div>
  );
}
