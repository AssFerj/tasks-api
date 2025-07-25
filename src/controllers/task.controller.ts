import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase, DeleteTaskUseCase, ListTasksUseCase, UpdateTaskUseCase } from "../useCases/task.useCase/index.js";

class CreateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const token = request.headers.authorization;
            if (!token) {
                return reply.code(401).send({ message: 'Unauthorized' });
            }

            const { userId } = request.params as { userId: string };
            const { description } = request.body as { description: string };
            const taskUseCase = new CreateTaskUseCase()
            const task = await taskUseCase.execute({userId, description})
            return reply.status(201).send({
                ok: true,
                message: "Task created successfully",
                data: task
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class ListTasksController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const token = request.headers.authorization;
            if (!token) {
                return reply.code(401).send({ message: 'Unauthorized' });
            }

            const { userId } = request.params as { userId: string };
            const taskUseCase = new ListTasksUseCase()
            const tasks = await taskUseCase.execute(userId)
            return reply.status(201).send({
                ok: true,
                message: "Tasks listted successfully",
                data: tasks
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class UpdateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const token = request.headers.authorization;
            if (!token) {
                return reply.code(401).send({ message: 'Unauthorized' });
            }

            const { userId, taskId } = request.params as { userId: string, taskId: string };
            const { description } = request.body as { description: string };
            const taskUseCase = new UpdateTaskUseCase()
            const updatedTask = await taskUseCase.execute({userId, taskId, description})
            return reply.status(201).send({
                ok: true,
                message: "Task updated successfully",
                data: updatedTask
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class DeleteTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const token = request.headers.authorization;
            if (!token) {
                return reply.code(401).send({ message: 'Unauthorized' });
            }

            const { userId, taskId } = request.params as { userId: string, taskId: string };
            const taskUseCase = new DeleteTaskUseCase()
            const deletedTask = await taskUseCase.execute(userId, taskId)
            return reply.status(201).send({
                ok: true,
                message: "Task deleted successfully",
                data: deletedTask
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

export { CreateTaskController, ListTasksController, UpdateTaskController, DeleteTaskController }