import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  widthClass?: string;
}

export function Modal({ title, subtitle, children, onClose, widthClass = 'max-w-3xl' }: ModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 p-4">
      <section className={`max-h-[90vh] w-full overflow-hidden rounded-lg bg-white shadow-panel ${widthClass}`}>
        <header className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
          </div>
          <Button variant="ghost" icon={<X className="h-4 w-4" />} onClick={onClose} aria-label="Close modal" />
        </header>
        <div className="max-h-[calc(90vh-82px)] overflow-y-auto px-6 py-5">{children}</div>
      </section>
    </div>
  );
}
