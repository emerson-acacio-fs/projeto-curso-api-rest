import { EntityRepository, Repository, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    return await this.findOne({ where: { name } });
  }
  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    return await this.find({
      where: { id: In(products.map(product => product.id)) },
    });
  }
}
