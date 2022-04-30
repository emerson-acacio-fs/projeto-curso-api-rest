import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

export default class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = getCustomRepository(UsersRepository);
    const products = await userRepository.find();
    return products;
  }
}