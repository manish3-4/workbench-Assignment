import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/Button';
import { PermissionBadges } from '../permissions/PermissionBadges';
import { PermissionMatrix } from '../permissions/PermissionMatrix';
import type { PermissionGroup, Role, RoleInput } from '../../types';

interface RoleFormProps {
  role?: Role;
  groups: PermissionGroup[];
  existingRoleNames: string[];
  mode: 'create' | 'edit' | 'view';
  onSubmit: (input: RoleInput) => Promise<void>;
  onCancel: () => void;
}

export function RoleForm({ role, groups, existingRoleNames, mode, onSubmit, onCancel }: RoleFormProps) {
  const readOnly = mode === 'view';
  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(3, 'Role name must be at least 3 characters.')
      .refine((value) => !existingRoleNames.includes(value.toLowerCase()), 'Role name must be unique.'),
    permissions: z.array(z.string()).min(1, 'Choose at least one permission.'),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoleInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: role?.name ?? '',
      permissions: role?.permissions ?? [],
    },
  });

  const selectedPermissions = watch('permissions');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_240px]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Role Name</span>
          <input
            {...register('name')}
            disabled={readOnly}
            className="h-11 w-full rounded-md border border-line px-3 text-sm disabled:bg-slate-50"
            placeholder="e.g. Finance Reviewer"
          />
          {errors.name ? <p className="mt-2 text-sm text-red-600">{errors.name.message}</p> : null}
        </label>
        <div className="rounded-lg border border-line bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{selectedPermissions.length}</p>
          <p className="text-sm text-slate-500">selected permissions</p>
        </div>
      </div>

      <Controller
        control={control}
        name="permissions"
        render={({ field }) => (
          <PermissionMatrix groups={groups} selected={field.value} onChange={field.onChange} readOnly={readOnly} />
        )}
      />
      {errors.permissions ? <p className="text-sm text-red-600">{errors.permissions.message}</p> : null}

      {readOnly ? (
        <PermissionBadges groups={groups} permissionIds={selectedPermissions} />
      ) : (
        <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-5">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" icon={<Save className="h-4 w-4" />} isLoading={isSubmitting}>
            Save Role
          </Button>
        </div>
      )}
    </form>
  );
}
