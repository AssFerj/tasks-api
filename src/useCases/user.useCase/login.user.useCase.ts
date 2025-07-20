import { GetUserByEmailUseCase } from './get.user.by.email.useCase.js';

class LoginUserUseCase {
  async execute(email: string) {
    const user = await new GetUserByEmailUseCase().execute(email);
    return user;
  }
}

export { LoginUserUseCase };