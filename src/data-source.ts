import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Category } from './categories/categories.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  entities: [User, Product, Category],

  migrations: ['src/migrations/*.ts'],

  synchronize: true,
});