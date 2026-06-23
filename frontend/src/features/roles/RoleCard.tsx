import { Copy, Eye, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import type { Role } from '../../types';

interface RoleCardProps {
  role: Role;
  resourceCount: number;
  onView: (role: Role) => void;
  onEdit: (role: Role) => void;
  onDuplicate: (role: Role) => void;
  onDelete: (role: Role) => void;
}

export function RoleCard({ role, resourceCount, onView, onEdit, onDuplicate, onDelete }: RoleCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-ink">{role.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge>{role.permissions.length} permissions</Badge>
            <Badge>{resourceCount} resources</Badge>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" icon={<Eye className="h-4 w-4" />} onClick={() => onView(role)} aria-label="View role" />
          <Button variant="ghost" icon={<Pencil className="h-4 w-4" />} onClick={() => onEdit(role)} aria-label="Edit role" />
          <Button variant="ghost" icon={<Copy className="h-4 w-4" />} onClick={() => onDuplicate(role)} aria-label="Duplicate role" />
          <Button variant="ghost" icon={<Trash2 className="h-4 w-4" />} onClick={() => onDelete(role)} aria-label="Delete role" />
        </div>
      </div>
    </Card>
  );
}
