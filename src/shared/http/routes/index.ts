import { uploadConfig } from 'config/upload';
import { Router, static as staticDir } from 'express';
import { productRouter } from 'modules/products/routes/products.routes';
import { sessionRouter } from 'modules/users/routes/session.routes';
import { userRouter } from 'modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/files', staticDir(uploadConfig.directory));

export { routes };
