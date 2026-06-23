import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { RoleInput } from '../types';
import { useUiStore } from '../store/uiStore';

export function usePermissions() {
  return useQuery({ queryKey: ['permissions'], queryFn: api.permissions });
}

export function useRoles() {
  return useQuery({ queryKey: ['roles'], queryFn: api.roles });
}

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: api.users });
}

export function useEffectivePermissions(userId?: string) {
  return useQuery({
    queryKey: ['effective-permissions', userId],
    queryFn: () => api.effectivePermissions(userId as string),
    enabled: Boolean(userId),
  });
}

export function useRoleMutations() {
  const queryClient = useQueryClient();
  const notify = useUiStore((state) => state.notify);
  const invalidate = () => Promise.all([queryClient.invalidateQueries({ queryKey: ['roles'] }), queryClient.invalidateQueries({ queryKey: ['users'] }), queryClient.invalidateQueries({ queryKey: ['effective-permissions'] })]);

  return {
    createRole: useMutation({
      mutationFn: (input: RoleInput) => api.createRole(input),
      onSuccess: async () => {
        await invalidate();
        notify('Role created.');
      },
      onError: (error) => notify(error.message),
    }),
    updateRole: useMutation({
      mutationFn: ({ roleId, input }: { roleId: string; input: RoleInput }) => api.updateRole(roleId, input),
      onSuccess: async () => {
        await invalidate();
        notify('Role updated.');
      },
      onError: (error) => notify(error.message),
    }),
    deleteRole: useMutation({
      mutationFn: (roleId: string) => api.deleteRole(roleId),
      onSuccess: async () => {
        await invalidate();
        notify('Role deleted.');
      },
      onError: (error) => notify(error.message),
    }),
  };
}

export function useUserRoleMutations() {
  const queryClient = useQueryClient();
  const notify = useUiStore((state) => state.notify);
  const invalidate = () => Promise.all([queryClient.invalidateQueries({ queryKey: ['users'] }), queryClient.invalidateQueries({ queryKey: ['effective-permissions'] })]);

  return {
    assignRole: useMutation({
      mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) => api.assignRole(userId, roleId),
      onSuccess: async () => {
        await invalidate();
        notify('Role assigned.');
      },
      onError: (error) => notify(error.message),
    }),
    removeRole: useMutation({
      mutationFn: ({ userId, roleId }: { userId: string; roleId: string }) => api.removeRole(userId, roleId),
      onSuccess: async () => {
        await invalidate();
        notify('Role removed.');
      },
      onError: (error) => notify(error.message),
    }),
  };
}
