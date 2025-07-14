import prismaClient from "../../prisma";

class ListTasksUseCase{
    async execute(userId: string){
        const findUser = await prismaClient.user.findFirst({
            where:{
                id: userId
            }
        })

        if(!findUser){
            throw new Error("User not found");
        }
        
        const tasks = await prismaClient.task.findMany({
            where:{
                user_id: userId
            }
        })

        return tasks;
    }
}

export { ListTasksUseCase }