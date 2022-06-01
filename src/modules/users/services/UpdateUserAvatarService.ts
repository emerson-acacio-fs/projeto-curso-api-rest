import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { DiskStorageProvider } from 'shared/providers/storageProvaider/DiskStorageProvider';
import { uploadConfig } from 'config/upload';
import { CloudinaryDiskStorageProvider } from 'shared/providers/storageProvaider/CloudinaryDiskStorageProvider';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  public async execute({ avatarFileName, user_id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }
    if (uploadConfig.driver === 'Cloudinary') {
      const cloudinaryDiskStorageProvider = new CloudinaryDiskStorageProvider();
      if (user.avatar) {
        await cloudinaryDiskStorageProvider.deleteFile(user.avatar);
      }

      const fileName = await cloudinaryDiskStorageProvider.saveFile(
        avatarFileName,
      );
      user.avatar = fileName;
    } else {
      const storageProvider = new DiskStorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFileName);
      user.avatar = fileName;
    }
    await userRepository.save(user);
    return user;
  }
}
