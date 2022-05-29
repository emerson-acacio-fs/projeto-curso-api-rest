import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { OrdersController } from '../controllers/OrdersController';
import isAuthenticated from 'shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().required(),
      products: Joi.array()
        .items(
          Joi.object().keys({
            id: Joi.string().required(),
            quantity: Joi.number().required(),
          }),
        )
        .min(1)
        .required(),
    },
  }),
  ordersController.create,
);
export { ordersRouter };
