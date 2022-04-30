import { Router } from 'express';
import { productRouter } from 'modules/products/routes/products.routes';
import { sessionRouter } from 'modules/users/routes/session.routes';
import { userRouter } from 'modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);

export { routes };
