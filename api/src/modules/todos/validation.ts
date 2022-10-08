import z from 'zod';

const titleSchema = z.string()
  .trim()
  .max(255, 'title can\'t exceed 255 characters')
  .min(2, 'title must be at least 2 characters long');

const descriptionSchema = z.string()
  .trim()
  .max(400, 'description can\'t exceed 400 characters')
  .min(2, 'description must be at least 2 characters long');


export const createTodoSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
});

export const updateTodoSchema = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  completed: z.boolean().optional(),
});

const objectIdSchema = z.string()
  .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, 'invalid object id format');

export const todoParams = z.object({
  id: objectIdSchema,
});

export const paginationQuery = z.object({
  limit: z.preprocess(
    v => parseInt(v as string, 10),
    z.number().positive().max(50),
  ).default(10),

  page: z.preprocess(
    v => parseInt(v as string, 10),
    z.number().positive(),
  ).default(1),

  sort: z.enum(['desc', 'asc']).default('desc'),
});

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
export type PaginationQuery = z.infer<typeof paginationQuery>;