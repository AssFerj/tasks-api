import prismaClient from "../../prisma/index.js";

class DeleteUserUseCase{
    async execute(user_id: string){
        if(!user_id){
            throw new Error("User id is required");
        }
        
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })
        if(!userAlreadyExists){
            throw new Error("User does not exists");
        }
        const deletedUser = await prismaClient.user.delete({
            where:{
                id: user_id
            }
        })
        return deletedUser;
    }
}

export { DeleteUserUseCase }