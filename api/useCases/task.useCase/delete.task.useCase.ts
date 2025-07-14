import prismaClient from "../../prisma";

class DeleteTaskUseCase{
    async execute(userId: string, taskId: string){
        if(!userId){
            throw new Error("User not found");
        }
        if(!taskId){
            throw new Error("Task not found");
        }
        const existingTask = await prismaClient.task.findFirst({
            where: {
              id: taskId,
              user_id: userId,
            },
        });
        if (!existingTask) {
            throw new Error("Task not found");
        }
        const deletedTask = await prismaClient.task.delete({
            where: {
              id: taskId,
            },
            select: {
                id: true
            }
        });
        
        return deletedTask;
    }
}

export { DeleteTaskUseCase }