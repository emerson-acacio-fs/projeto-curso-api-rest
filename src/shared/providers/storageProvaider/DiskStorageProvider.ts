import { uploadConfig } from 'config/upload';
import fs from 'fs';
import path from 'path';

export class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.directory, file),
    );
    return file;
  }
  public async deleteFile(file: string): Promise<void> {
    console.log('f', file);
    const filePath = path.resolve(uploadConfig.directory, file);
    console.log('re', filePath);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}
