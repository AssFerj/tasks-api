import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifyCsrfProtection from '@fastify/csrf-protection'
import { userRoutes } from './routes/user.routes'
import { taskRoutes } from './routes/task.routes'

const app = Fastify({logger: true})

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({
        message: error.message
    })
})

const start = async () => {
    await app.register(fastifyCookie);
    await app.register(fastifyCsrfProtection, {
        cookieKey: 'X-CSRF-Token'
    });
    await app.register(cors);
    await app.register(userRoutes);
    await app.register(taskRoutes);

    // Start server only if not in Vercel environment
    if (!process.env.VERCEL) {
        try {
            const port = Number(process.env.API_PORT) || 3333;
            await app.listen({ port });
        } catch (error) {
            app.log.error(error);
            process.exit(1);
        }
    }
};

start();

// Export the app for Vercel
export default app;