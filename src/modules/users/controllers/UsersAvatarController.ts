import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export class UsersAvatarController {
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response | undefined> {
    const updateAvatar = new UpdateUserAvatarService();
    if (request.file?.filename) {
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json(instanceToInstance(user));
    }
  }
}
