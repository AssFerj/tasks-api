import prismaClient from "../../prisma/index.js";

export interface ICreateTaskProps{
    userId: string
    description: string
}

class CreateTaskUseCase{
    async execute(task: ICreateTaskProps){
        if(!task.description){
            throw new Error("Missing parameters");
        }

        const user = await prismaClient.user.findFirst({
            where:{
                id: task.userId
            }
        })

        if(!user){
            throw new Error("User not found");
        }
    
        const newTask = await prismaClient.task.create({
            data:{
                description: task.description,
                user_id: task.userId
            },
            select:{
                id: true,
                description: true,
                user_id: true
            }
        })

        return newTask;
    }
}

export { CreateTaskUseCase }