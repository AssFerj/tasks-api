import prismaClient from "../../prisma/index.js";

class LoginUserUseCase{
    async execute(email: string){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        return user;
    }
}

export {LoginUserUseCase}