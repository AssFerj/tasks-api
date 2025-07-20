import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { CreateTaskController, DeleteTaskController, ListTasksController, UpdateTaskController } from '../controllers/task.controller.js';
import {
    createTaskBodySchema,
    updateTaskBodySchema,
    taskParamsSchema,
    userTasksParamsSchema,
    taskResponseSchema,
    listTasksResponseSchema,
    errorResponseSchema
} from '../schemas/task.schemas.js';

export const taskRoutes: FastifyPluginAsync = async (fastify) => {
    const app = fastify.withTypeProvider<ZodTypeProvider>();

    // Create task
    app.post('/user/:userId/task', {
        schema: {
            tags: ['Tasks'],
            description: 'Create task for a user',
            params: userTasksParamsSchema,
            body: createTaskBodySchema,
            response: {
                201: taskResponseSchema,
                400: errorResponseSchema,
                401: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new CreateTaskController().handle(request, reply);
    });

    // List tasks for a user
    app.get('/user/:userId/tasks', {
        schema: {
            tags: ['Tasks'],
            description: 'List all tasks for a user',
            params: userTasksParamsSchema,
            response: {
                200: listTasksResponseSchema,
                401: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new ListTasksController().handle(request, reply);
    });

    // Update a task
    app.put('/user/:userId/task/:taskId', {
        schema: {
            tags: ['Tasks'],
            description: 'Update a specific task',
            params: taskParamsSchema,
            body: updateTaskBodySchema,
            response: {
                200: taskResponseSchema,
                400: errorResponseSchema,
                401: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new UpdateTaskController().handle(request, reply);
    });

    // Delete a task
    app.delete('/user/:userId/task/:taskId', {
        schema: {
            tags: ['Tasks'],
            description: 'Delete a specific task',
            params: taskParamsSchema,
            response: {
                200: taskResponseSchema, // Or a different success schema
                401: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new DeleteTaskController().handle(request, reply);
    });
};