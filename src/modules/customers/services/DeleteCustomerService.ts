import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findOne({ id });
    if (!customer) {
      throw new AppError('customer not found.');
    }

    await customerRepository.remove(customer);
  }
}
