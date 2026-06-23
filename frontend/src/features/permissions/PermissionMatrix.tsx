import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { titleCase } from '../../lib/format';
import type { PermissionGroup } from '../../types';

interface PermissionMatrixProps {
  groups: PermissionGroup[];
  selected: string[];
  onChange: (permissions: string[]) => void;
  readOnly?: boolean;
}

export function PermissionMatrix({ groups, selected, onChange, readOnly }: PermissionMatrixProps) {
  const [search, setSearch] = useState('');
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      actions: group.actions.filter((action) => `${group.resource}:${action}`.includes(search.toLowerCase())),
    }))
    .filter((group) => group.actions.length > 0);

  function toggle(permission: string) {
    if (readOnly) {
      return;
    }
    onChange(selectedSet.has(permission) ? selected.filter((item) => item !== permission) : [...selected, permission]);
  }

  function toggleResource(resource: string, actions: string[]) {
    if (readOnly) {
      return;
    }
    const resourcePermissions = actions.map((action) => `${resource}:${action}`);
    const everySelected = resourcePermissions.every((permission) => selectedSet.has(permission));
    onChange(
      everySelected
        ? selected.filter((permission) => !resourcePermissions.includes(permission))
        : Array.from(new Set([...selected, ...resourcePermissions])),
    );
  }

  return (
    <div className="space-y-4">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-10 w-full rounded-md border border-line bg-white pl-9 pr-3 text-sm"
          placeholder="Search permissions"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        {filteredGroups.map((group) => {
          const allSelected = group.actions.every((action) => selectedSet.has(`${group.resource}:${action}`));
          return (
            <section key={group.resource} className="rounded-lg border border-line bg-slate-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-semibold text-ink">{titleCase(group.resource)}</h3>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    disabled={readOnly}
                    onChange={() => toggleResource(group.resource, group.actions)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  Select all
                </label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {group.actions.map((action) => {
                  const permission = `${group.resource}:${action}`;
                  return (
                    <label key={permission} className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedSet.has(permission)}
                        disabled={readOnly}
                        onChange={() => toggle(permission)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      {titleCase(action)}
                    </label>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
