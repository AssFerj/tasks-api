import prismaClient from "../../prisma";

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