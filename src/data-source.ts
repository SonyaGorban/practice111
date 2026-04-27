import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const host = process.env.POSTGRES_HOST as string;
const port = parseInt(process.env.POSTGRES_PORT || '5432', 10);
const username = process.env.POSTGRES_USER as string;
const password = process.env.POSTGRES_PASSWORD as string;
const database = process.env.POSTGRES_DB as string;

export default new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
entities: ['src/**/*.entity.ts'],
migrations: ['src/migrations/*.ts'],
});