import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    }
    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const { created_at: tokenCreatedAt } = userToken;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expire');
    }
    user.password = await hash(password, 8);

    await userRepository.save(user);
  }
}
