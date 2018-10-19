import faker from 'faker';
import { Product } from 'models';

export default function ProductFactory(productData = {}) {
  return Product.create({
    name: faker.lorem.text(),
    description: faker.lorem.paragraph(),
    price: faker.random.number(100000) + 100000,
    visible: true,
    ...productData
  });
}
