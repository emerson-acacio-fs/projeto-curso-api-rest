import { uploadConfig } from 'config/upload';
import { Router, static as staticDir } from 'express';
import { customerRouter } from 'modules/customers/routes/customers.routes';
import { ordersRouter } from 'modules/orders/routes/orders.routes';
import { productRouter } from 'modules/products/routes/products.routes';
import { passwordRouter } from 'modules/users/routes/password.routes';
import { profileRouter } from 'modules/users/routes/profile.routes';
import { sessionRouter } from 'modules/users/routes/session.routes';
import { userRouter } from 'modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/files', staticDir(uploadConfig.directory));
routes.use('/profile', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

export { routes };
