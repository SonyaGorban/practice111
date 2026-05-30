import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { CreateTables1700000001000 } from './migrations/CreateTables1700000001000';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Category } from './categories/categories.entity';
import { Product } from './products/product.entity';
import { InitTables1777233207431 } from './migrations/1777233207431-InitTables';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [
    OrdersModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST!,
      port: parseInt(process.env.POSTGRES_PORT!, 10),
      username: process.env.POSTGRES_USER!,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DB!,

      autoLoadEntities: true, // ✔ тільки це
      synchronize: false,

      migrationsRun: true,
      migrations: [
        CreateTables1700000001000,
        InitTables1777233207431,
      ],
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'redis',
            port: 6379,
          },
        }),
        ttl: 60,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}