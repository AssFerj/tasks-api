import prismaClient from "../../prisma/index.js";

class GetUserByEmailUseCase{
    async execute(email: string){
        const user = await prismaClient.user.findUnique({
            where:{
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                created_at: true,
                updated_at: true
            }
        })
        return user;
    }
}

export { GetUserByEmailUseCase }