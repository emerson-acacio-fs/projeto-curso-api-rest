import { RedisCache } from 'shared/cahce/RedisCache';
import { AppError } from 'shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already a product with this name :(');
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
    });
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productRepository.save(product);
    return product;
  }
}
