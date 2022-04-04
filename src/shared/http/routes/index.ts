import { Router } from 'express';
import { productRouter } from 'modules/products/routes/products.routes';
import { userRouter } from 'modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);

export { routes };
