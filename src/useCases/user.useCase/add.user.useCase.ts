import prismaClient from "../../prisma";

export interface ICreateUserProps{
    name: string, 
    email: string, 
    password: string
}

class CreateUserUseCase{
    async execute(user: ICreateUserProps){
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: user.email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists");
        }
    
        const newUser = await prismaClient.user.create({
            data:{
                name: user.name,
                email: user.email,
                password: user.password
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return newUser;
    }
}

export { CreateUserUseCase }