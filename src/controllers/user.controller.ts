import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase, GetUserByEmailUseCase, ListUsersUseCase, LoginUserUseCase } from "../useCases/user.useCase/index.js";
import { AuthUseCase } from "../useCases/auth.useCase/auth.useCase.js"
import bcrypt from "bcrypt";

class CreateUserController{
    async handle({ name, email, password }: { name: string, email: string, password: string }, reply: FastifyReply){
        try {
            console.log('--- REGISTRATION ATTEMPT ---');
            console.log('Received data:', { name, email });

            const userAlreadyExist = new GetUserByEmailUseCase()
            const result = await userAlreadyExist.execute(email)

            if(result){
                console.log('Registration failed: User already exists.');
                return reply.status(400).send({message: "User already exist"})
            }

            const hashPassword = bcrypt.hashSync(password, 10)
            const userUseCase = new CreateUserUseCase()
            const user = await userUseCase.execute({
                name: name,
                email: email,
                password: hashPassword
            })

            console.log('User successfully created in DB:', user);

            return reply.status(201).send({
                ok: true,
                message: "User created successfully",
                data: user
            })
        } catch (error) {
            console.log('--- REGISTRATION ERROR ---', error);
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class ListUsersController{
    async handle(reply: FastifyReply){
        try {
            const userUseCase = new ListUsersUseCase()
            const users = await userUseCase.execute()
            return reply.status(201).send({
                ok: true,
                message: "Users listted successfully",
                data: users.map((user: { id: string; name: string; email: string; created_at: Date | null, updated_at: Date | null }) => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.created_at,
                        updatedAt: user.updated_at
                    }
                })
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class GetUserController{
    async handle({ email }: { email: string }, reply: FastifyReply){
        try {
            const userUseCase = new GetUserByEmailUseCase()
            const user = await userUseCase.execute(email)
            if(!user){
                return reply.status(404).send({message: "User not found"})
            }
            return reply.status(201).send({
                ok: true,
                message: "User listted successfully",
                data: user
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class LoginUserController{
    async handle({ email, password }: { email: string, password: string }, reply: FastifyReply){
        try {
            if(!email){
                return reply.status(404).send({message: "Missing required field: E-mail"})
            }
            if(!password){
                return reply.status(404).send({message: "Missing required field: Password"})
            }
            const userUseCase = new LoginUserUseCase()
            const loggedUser = await userUseCase.execute(email)
            if(!loggedUser){
                return reply.status(401).send({message: "Invalid credentials"})
            }
            const decodePassword = bcrypt.compareSync(password, loggedUser.password)
            if(!decodePassword){
                return reply.status(401).send({message: "Invalid credentials"})
            }
            const token = new AuthUseCase().createToken({
                id: loggedUser.id,
                name: loggedUser.name,
                email: loggedUser.email
            })
            return reply.status(201).send({
                ok: true,
                message: "User logged successfully",
                data: {
                    id: loggedUser.id,
                    name: loggedUser.name,
                    email: loggedUser.email,
                    // csrfToken: csrfToken,
                    token
                }
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

export { CreateUserController, GetUserController, ListUsersController, LoginUserController }