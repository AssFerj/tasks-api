import Fastify, { FastifyInstance } from 'fastify';
import cors, { fastifyCors } from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { userRoutes } from './routes/user.routes.js';
import { taskRoutes } from './routes/task.routes.js';

// Function to create and configure the Fastify app
async function createApp(): Promise<FastifyInstance> {
    const app = Fastify({ logger: true });

    // Register plugins
    await app.register(cors);
    await app.register(fastifyCookie);
    await app.register(fastifyCors, {origin: '*'});
    await app.register(fastifyCsrfProtection, {
        cookieKey: 'X-CSRF-Token',
    });

    // Register routes
    await app.register(userRoutes);
    await app.register(taskRoutes);
    
    // Add a root route for health check
    app.get('/', async (request, reply) => {
        reply.send({ message: 'Welcome to Task-In API' });
    });

    // Custom error handler
    app.setErrorHandler((error, request, reply) => {
        app.log.error(error);
        reply.code(error.statusCode || 500).send({ message: error.message });
    });

    return app;
}

// Vercel serverless function handler
export default async (req: any, res: any) => {
    const app = await createApp();
    await app.ready();
    app.server.emit('request', req, res);
};