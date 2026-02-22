import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address').toLowerCase().trim();

// Auth schemas
export const loginSchema = z.object({
  email: emailSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  name: z.string().min(1, 'Name is required').max(100, 'Name too long').trim(),
});

// Admin schemas
export const createUserSchema = z.object({
  email: emailSchema,
  name: z.string().min(1).max(100).trim(),
  role: z.enum(['EDITOR', 'ADMIN']),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).max(100).trim().optional(),
  role: z.enum(['EDITOR', 'ADMIN']).optional(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});

export const createProtectionSchema = z.object({
  resourceType: z.enum(['PAGE', 'SECTION', 'PROJECT']),
  resourceId: z.string().min(1).max(255),
  minRole: z.enum(['EDITOR', 'ADMIN']),
});

export const createShareLinkSchema = z.object({
  resourceType: z.enum(['PAGE', 'SECTION', 'PROJECT', 'ALL']),
  resourceId: z.string().max(255).nullable(),
  expiresInHours: z.number().min(1).max(8760).default(24), // Max 1 year
  maxUses: z.number().min(1).nullable().optional(),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateProtectionInput = z.infer<typeof createProtectionSchema>;
export type CreateShareLinkInput = z.infer<typeof createShareLinkSchema>;
