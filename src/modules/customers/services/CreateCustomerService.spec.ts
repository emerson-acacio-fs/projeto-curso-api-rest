import { AppError } from 'shared/errors/AppError';
import { FakeCustomersRepository } from '../typeorm/repositories/fakes/fakeCustomerRespository';
import CreateCustomerService from './CreateCustomerService';
const repository = new FakeCustomersRepository();
jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    getCustomRepository: () => repository,
  };
});

describe('CreateCustomer', () => {
  it('Should be able to create a new customer', async () => {
    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name: 'Emerson',
      email: 'emerson@example.com',
    });

    expect(customer.email).toEqual('emerson@example.com');
    expect(customer.name).toEqual('Emerson');
    expect(customer).toHaveProperty('id');
  });
  it('Should not be able to create two customer with the same e-mail', async () => {
    const createCustomer = new CreateCustomerService();

    await createCustomer.execute({
      name: 'Emerson2',
      email: 'emerson2@example.com',
    });

    expect(
      createCustomer.execute({
        name: 'Emerson2',
        email: 'emerson2@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
