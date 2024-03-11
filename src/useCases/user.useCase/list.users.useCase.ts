import prismaClient from "../../prisma";

class ListUsersUseCase{
    async execute(){
        const users = await prismaClient.user.findMany()

        return users;
    }
}

export { ListUsersUseCase }