import { uploadConfig } from 'config/upload';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { AppError } from 'shared/errors/AppError';

export class CloudinaryDiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file);

    const response = await cloudinary.uploader.upload(originalPath, error => {
      if (error) {
        throw new AppError('Upload image error!');
      }
    });

    await fs.promises.unlink(originalPath);

    return `${response.public_id}.${response.format}`;
  }
  public async deleteFile(file: string): Promise<void> {
    try {
      const public_id = file.replace(/\.[^/.]+$/, '');
      await cloudinary.uploader.destroy(public_id);
    } catch {
      return;
    }
  }
}
