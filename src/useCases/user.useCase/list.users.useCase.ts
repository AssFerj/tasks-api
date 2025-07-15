import prismaClient from "../../prisma/index.js";

class ListUsersUseCase{
    async execute(){
        const users = await prismaClient.user.findMany()

        return users;
    }
}

export { ListUsersUseCase }