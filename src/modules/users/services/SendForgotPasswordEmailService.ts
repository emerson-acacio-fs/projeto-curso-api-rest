import EtherealMail from 'config/mail/EtherealMail';
import path from 'path';
import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

export default class SendForgotPasswordEmailService {
  public async execute(email: string): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const userToken = await userTokensRepository.generate(user.id);
    await EtherealMail.sendMail({
      to: { email: user.email, name: user.name },
      subject: 'fgfffff',
      templateData: {
        file: path.resolve(__dirname, '..', 'views', 'forgot_password.hbs'),
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${userToken.token}`,
        },
      },
    });
  }
}
