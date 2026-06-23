import { z } from 'zod';

export const assignRoleSchema = z.object({
  roleId: z.string().min(1, 'roleId is required.'),
});

export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
