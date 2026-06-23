import { Shield, UserRoundCog, Users } from 'lucide-react';
import { Button } from './components/Button';
import { Toast } from './components/Toast';
import { RolesPage } from './features/roles/RolesPage';
import { UsersPage } from './features/users/UsersPage';
import { cn } from './lib/cn';
import { useUiStore } from './store/uiStore';

const navItems = [
  { id: 'users' as const, label: 'Users', icon: Users },
  { id: 'roles' as const, label: 'Roles', icon: UserRoundCog },
];

export function App() {
  const page = useUiStore((state) => state.page);
  const setPage = useUiStore((state) => state.setPage);

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-white px-4 py-5 lg:block">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-white">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-ink">Workbench RBAC</p>
            <p className="text-xs text-slate-500">Access builder</p>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={cn(
                  'flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition',
                  page === item.id ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-ink',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="mb-3 flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-600" />
            <p className="font-semibold text-ink">Workbench RBAC</p>
          </div>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <Button key={item.id} variant={page === item.id ? 'primary' : 'secondary'} onClick={() => setPage(item.id)}>
                {item.label}
              </Button>
            ))}
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {page === 'users' ? <UsersPage /> : <RolesPage />}
        </main>
      </div>

      <Toast />
    </div>
  );
}
