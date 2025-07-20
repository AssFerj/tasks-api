import fastify from 'fastify';
import { ZodTypeProvider, validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';
import cors from '@fastify/cors';
import fastifyCookie from '@fastify/cookie';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import { userRoutes } from './routes/user.routes';
import { taskRoutes } from './routes/task.routes';
import { FastifyRequest, FastifyReply } from 'fastify';

// Initialize Fastify with the ZodTypeProvider
const app = fastify({
    logger: true
}).withTypeProvider<ZodTypeProvider>();

// Set the validator and serializer compilers from the type provider
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Register plugins
app.register(cors, {
    origin: '*', // Allow all origins
    credentials: true,
});
app.register(fastifyCookie);

// Register Swagger for API documentation
app.register(swagger, {
    openapi: {
        info: {
            title: 'Taskin API',
            description: 'API documentation for Taskin App',
            version: '1.0.0'
        },
        tags: [
            { name: 'Users', description: 'End-points relacionados a Users' },
            { name: 'Tasks', description: 'End-points relacionados a Tasks' }
        ]
    },
    transform: jsonSchemaTransform
});

app.register(swaggerUi, {
    routePrefix: '/doc'
});

// Register routes
app.register(userRoutes);
app.register(taskRoutes);
app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
    return { message: 'API Task-In running!' };
});

// Start the server
const start = async () => {
    try {
        await app.listen({ port: 3333, host: '0.0.0.0' });
        app.log.info(`HTTP Server Running on port 3333`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
