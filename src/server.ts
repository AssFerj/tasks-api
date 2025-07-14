import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import { userRoutes } from './routes/user.routes';
import { taskRoutes } from './routes/task.routes';

// Function to create and configure the Fastify app
async function createApp(): Promise<FastifyInstance> {
    const app = Fastify({ logger: true });

    // Register plugins
    await app.register(cors);
    await app.register(fastifyCookie);
    await app.register(fastifyCsrfProtection, {
        cookieKey: 'X-CSRF-Token',
    });

    // Register routes
    await app.register(userRoutes);
    await app.register(taskRoutes);
    
    // Add a root route for health check
    app.get('/', async (request, reply) => {
        return { message: 'Welcome to Task-In API' };
    });

    // Custom error handler
    app.setErrorHandler((error, request, reply) => {
        app.log.error(error);
        reply.code(error.statusCode || 500).send({ message: error.message });
    });

    return app;
}

// Start server only for local development
if (process.env.NODE_ENV !== 'production') {
    createApp().then(app => {
        app.listen({ port: 3333 }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server listening at ${address}`);
        });
    });
}

// Vercel serverless function handler
let cachedApp: FastifyInstance;

module.exports = async (req: any, res: any) => {
    if (!cachedApp) {
        cachedApp = await createApp();
        await cachedApp.ready();
    }
    cachedApp.server.emit('request', req, res);
};