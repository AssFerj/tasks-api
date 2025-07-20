import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { CreateUserController, GetUserController, ListUsersController, LoginUserController } from '../controllers/user.controller.js'
import { 
    loginBodySchema, 
    successResponseSchema, 
    errorResponseSchema,
    createUserBodySchema,
    userParamsSchema,
    userResponseSchema,
    listUsersResponseSchema
} from '../schemas/user.schemas.js'

export const userRoutes: FastifyPluginAsync = async (fastfy) => {
    const app = fastfy.withTypeProvider<ZodTypeProvider>()
    // List all users
        app.get('/users', {
        schema: {
            tags: ['Users'],
            description: 'List all users',
            response: {
                200: listUsersResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new ListUsersController().handle(reply)
    })

    // Get user by email
        app.get('/user/:email', {
        schema: {
            tags: ['Users'],
            description: 'Get user by email',
            params: userParamsSchema,
            response: {
                200: userResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new GetUserController().handle(request.params, reply)
    })

    // Create user
        app.post('/user', {
        schema: {
            tags: ['Users'],
            description: 'Create user',
            body: createUserBodySchema,
            response: {
                201: userResponseSchema,
                400: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new CreateUserController().handle(request.body, reply)
    })

    // Login user
        app.post('/login', {
        schema: {
            tags: ['Users'],
            description: 'Login user',
            body: loginBodySchema,
            response: {
                201: successResponseSchema,
                401: errorResponseSchema,
                404: errorResponseSchema,
                500: errorResponseSchema
            }
        }
    }, (request, reply) => {
        return new LoginUserController().handle(request.body, reply)
    })
}