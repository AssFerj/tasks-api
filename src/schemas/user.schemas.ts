import { z } from 'zod';

export const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export const successResponseSchema = z.object({
    ok: z.boolean(),
    message: z.string(),
    data: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        token: z.string()
    })
});

export const errorResponseSchema = z.object({
    message: z.string()
});

export const createUserBodySchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

export const userParamsSchema = z.object({
    email: z.string().email()
});

const userCoreSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.string(), 
    updatedAt: z.string()
});

export const userResponseSchema = z.object({
    ok: z.boolean(),
    message: z.string(),
    data: userCoreSchema
});

export const listUsersResponseSchema = z.object({
    ok: z.boolean(),
    message: z.string(),
    data: z.array(userCoreSchema)
});
