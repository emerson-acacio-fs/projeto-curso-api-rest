import { CustomersRepository } from 'modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from 'modules/products/typeorm/repositories/ProductRepository';
import { RedisCache } from 'shared/cahce/RedisCache';
import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const productsExists = await productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = productsExists.map(product => product.id);
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        (productsExists.find(p => product.id === p.id)?.quantity || 0) <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is already available for ${quantityAvailable[0].id}`,
      );
    }

    const serializeProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain , @typescript-eslint/no-non-null-assertion
      price: productsExists.find(p => product.id === p.id)?.price!,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializeProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsExists.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
