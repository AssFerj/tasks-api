import { z } from 'zod';

// Core schema for a single task
const taskCoreSchema = z.object({
    id: z.string(),
    description: z.string(),
    status: z.string(), // You might want to use z.enum(['PENDING', 'COMPLETED']) in the future
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string(),
});

// Schema for the body when creating a task
export const createTaskBodySchema = z.object({
    description: z.string().min(1),
});

// Schema for the body when updating a task
export const updateTaskBodySchema = z.object({
    description: z.string().min(1).optional(),
    status: z.string().optional(), // Same here for z.enum
});

// Schema for URL parameters
export const taskParamsSchema = z.object({
    userId: z.string(),
    taskId: z.string(),
});

export const userTasksParamsSchema = z.object({
    userId: z.string(),
});

// Schema for a successful single task response
export const taskResponseSchema = z.object({
    ok: z.boolean(),
    message: z.string(),
    data: taskCoreSchema,
});

// Schema for a successful list of tasks response
export const listTasksResponseSchema = z.object({
    ok: z.boolean(),
    message: z.string(),
    data: z.array(taskCoreSchema),
});

// Generic error response
export const errorResponseSchema = z.object({
    message: z.string(),
});
