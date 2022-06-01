import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';
import { UsersController } from '../controllers/UsersController';
import isAuthenticated from 'shared/http/middlewares/isAuthenticated';
import { UsersAvatarController } from '../controllers/UsersAvatarController';
import multer from 'multer';
import { uploadConfig } from 'config/upload';

const userRouter = Router();
const userController = new UsersController();
const userAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig.multer);

userRouter.get('/', isAuthenticated, userController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export { userRouter };
