import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CreateTaskController, DeleteTaskController, ListTasksController, UpdateTaskController } from '../controllers/task.controllers'

export async function taskRoutes(fastfy: FastifyInstance) {
    fastfy.post('/user/:userId/task', (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTaskController().handle(request, reply)
    })

    fastfy.get('/user/:userId/task', (request: FastifyRequest, reply: FastifyReply) => {
        return new ListTasksController().handle(request, reply)
    })

    fastfy.put('/user/:userId/task/:taskId', (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateTaskController().handle(request, reply)
    })

    fastfy.delete('/user/:userId/task/:taskId', (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteTaskController().handle(request, reply)
    })
}