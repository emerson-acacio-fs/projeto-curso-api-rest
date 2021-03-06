import { RedisCache } from 'shared/cahce/RedisCache';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();

    let products = await redisCache.record<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );
    if (!products) {
      products = await productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }
    return products;
  }
}
