import { CheckCircle2, X } from 'lucide-react';
import { Button } from './Button';
import { useUiStore } from '../store/uiStore';

export function Toast() {
  const toast = useUiStore((state) => state.toast);
  const clearToast = useUiStore((state) => state.clearToast);

  if (!toast) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex min-w-72 items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 shadow-panel">
      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
      <p className="flex-1 text-sm font-medium text-ink">{toast}</p>
      <Button variant="ghost" icon={<X className="h-4 w-4" />} onClick={clearToast} aria-label="Dismiss toast" />
    </div>
  );
}
