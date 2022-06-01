import { Exclude, Expose } from 'class-transformer';
import { uploadConfig } from 'config/upload';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @Column()
  avatar: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (uploadConfig.driver === 'Cloudinary') {
      return !this.avatar
        ? null
        : `${process.env.CLOUDINARY_STORAGE_URL}/${this.avatar}`;
    } else {
      return !this.avatar
        ? null
        : `${process.env.APP_API_URL}/files/${this.avatar}`;
    }
  }
}
