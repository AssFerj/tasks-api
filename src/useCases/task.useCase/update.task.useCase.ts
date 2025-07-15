import prismaClient from "../../prisma/index.js";

export interface IUpdateTaskProps {
    userId: string, 
    taskId: string, 
    description: string
}

class UpdateTaskUseCase{
    async execute(data: IUpdateTaskProps){
        const task = await prismaClient.task.update({
            where:{
                id: data.taskId,
                user_id: data.userId
            },
            data:{
                description: data.description
            }
        })

        return task;
    }
}

export {UpdateTaskUseCase}