import prismaClient from "../../prisma/index.js";

class GetUserByEmailUseCase{
    async execute(email: string){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }, 
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            return null;
          }

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }
}

export { GetUserByEmailUseCase }