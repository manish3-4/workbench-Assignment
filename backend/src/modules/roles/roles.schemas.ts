import { z } from 'zod';

export const roleInputSchema = z.object({
  name: z.string().trim().min(3, 'Role name must be at least 3 characters.'),
  permissions: z.array(z.string()).min(1, 'Choose at least one permission.'),
});

export type RoleInput = z.infer<typeof roleInputSchema>;
