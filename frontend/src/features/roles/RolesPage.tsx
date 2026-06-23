import { Plus } from 'lucide-react';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';
import { RoleCard } from './RoleCard';
import { RoleForm } from './RoleForm';
import { usePermissions, useRoleMutations, useRoles } from '../../hooks/useRbacQueries';
import { useUiStore } from '../../store/uiStore';
import type { Role, RoleInput } from '../../types';

function countResources(role: Role) {
  return new Set(role.permissions.map((permission) => permission.split(':')[0])).size;
}

export function RolesPage() {
  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const { data: groups = [], isLoading: permissionsLoading } = usePermissions();
  const roleModal = useUiStore((state) => state.roleModal);
  const openRoleModal = useUiStore((state) => state.openRoleModal);
  const closeRoleModal = useUiStore((state) => state.closeRoleModal);
  const { createRole, updateRole, deleteRole } = useRoleMutations();

  const existingRoleNames = roles
    .filter((role) => role.id !== roleModal?.role?.id)
    .map((role) => role.name.toLowerCase());

  async function submitRole(input: RoleInput) {
    if (roleModal?.mode === 'edit' && roleModal.role) {
      await updateRole.mutateAsync({ roleId: roleModal.role.id, input });
    } else {
      await createRole.mutateAsync(input);
    }
    closeRoleModal();
  }

  async function duplicateRole(role: Role) {
    await createRole.mutateAsync({
      name: `${role.name} Copy`,
      permissions: role.permissions,
    });
  }

  async function removeRole(role: Role) {
    if (window.confirm(`Delete ${role.name}? Users assigned to this role will lose it.`)) {
      await deleteRole.mutateAsync(role.id);
    }
  }

  if (rolesLoading || permissionsLoading) {
    return <div className="rounded-lg border border-line bg-white p-6 text-sm text-slate-500">Loading roles...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Roles</h1>
          <p className="mt-1 text-sm text-slate-500">Design access profiles and review permission coverage.</p>
        </div>
        <Button icon={<Plus className="h-4 w-4" />} onClick={() => openRoleModal('create')}>
          Create Role
        </Button>
      </div>

      {roles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-line bg-white p-8 text-center">
          <h2 className="font-semibold text-ink">No roles yet</h2>
          <p className="mt-1 text-sm text-slate-500">Create the first role to start assigning permissions.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              resourceCount={countResources(role)}
              onView={(selectedRole) => openRoleModal('view', selectedRole)}
              onEdit={(selectedRole) => openRoleModal('edit', selectedRole)}
              onDuplicate={duplicateRole}
              onDelete={removeRole}
            />
          ))}
        </div>
      )}

      {roleModal ? (
        <Modal
          title={roleModal.mode === 'create' ? 'Create Role' : `${roleModal.role?.name ?? 'Role'} Details`}
          subtitle="Select permissions grouped by resource."
          onClose={closeRoleModal}
        >
          <RoleForm
            role={roleModal.role}
            groups={groups}
            existingRoleNames={existingRoleNames}
            mode={roleModal.mode}
            onSubmit={submitRole}
            onCancel={closeRoleModal}
          />
        </Modal>
      ) : null}
    </div>
  );
}
