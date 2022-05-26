import { compare, hash } from 'bcryptjs';
import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('customer not found.');
    }

    const customerExits = await customerRepository.findByEmail(email);

    if (customerExits && customerExits.id !== customer.id) {
      throw new AppError('There is already one costumer with this e-mail.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}
