import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const users = await listUser.execute();
    return response.json(instanceToInstance(users));
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ email, name, password });
    return response.json(instanceToInstance(user));
  }
}
