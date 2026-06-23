import { create } from 'zustand';
import type { Role, User } from '../types';

type Page = 'users' | 'roles';

interface UiState {
  page: Page;
  selectedUserId?: string;
  roleModal?: { mode: 'create' | 'edit' | 'view'; role?: Role };
  userRoleModal?: { user: User };
  toast?: string;
  setPage: (page: Page) => void;
  setSelectedUser: (userId: string) => void;
  openRoleModal: (mode: 'create' | 'edit' | 'view', role?: Role) => void;
  closeRoleModal: () => void;
  openUserRoleModal: (user: User) => void;
  closeUserRoleModal: () => void;
  notify: (message: string) => void;
  clearToast: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  page: 'users',
  setPage: (page) => set({ page }),
  setSelectedUser: (selectedUserId) => set({ selectedUserId }),
  openRoleModal: (mode, role) => set({ roleModal: { mode, role } }),
  closeRoleModal: () => set({ roleModal: undefined }),
  openUserRoleModal: (user) => set({ userRoleModal: { user } }),
  closeUserRoleModal: () => set({ userRoleModal: undefined }),
  notify: (toast) => {
    set({ toast });
    window.setTimeout(() => set({ toast: undefined }), 3000);
  },
  clearToast: () => set({ toast: undefined }),
}));
