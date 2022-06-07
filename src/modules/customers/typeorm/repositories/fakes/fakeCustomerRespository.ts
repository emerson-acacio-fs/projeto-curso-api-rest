import Customer from '../../entities/Customer';
import { v4 as uuidv4 } from 'uuid';
export class FakeCustomersRepository {
  private customers: Customer[] = [];
  public async findByName(name: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.name === name);
  }
  public async findById(id: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.id === id);
  }
  public async findByEmail(email: string): Promise<Customer | undefined> {
    return this.customers.find(customer => customer.email === email);
  }

  public async create({
    name,
    email,
  }: {
    name: string;
    email: string;
  }): Promise<Customer | undefined> {
    const customer = new Customer();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    return customer;
  }
  public async save(customer: Customer): Promise<Customer | undefined> {
    this.customers.push(customer);
    return customer;
  }
}
