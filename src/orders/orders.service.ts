import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import {
  Repository,
  DataSource,
} from 'typeorm';

import { CACHE_MANAGER }
  from '@nestjs/cache-manager';

import type { Cache }
  from 'cache-manager';

import { Order }
  from './entities/order.entity';

import { OrderItem }
  from './entities/order-item.entity';

import { Product }
  from '../products/product.entity';

import { CreateOrderDto }
  from './dto/create-order.dto';

import { UpdateOrderStatusDto }
  from './dto/update-order-status.dto';

import { OrderQueryDto }
  from './dto/order-query.dto';

import { OrderStatus }
  from '../common/enums/order-status.enum';

import { Role }
  from '../common/enums/role.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    private readonly dataSource: DataSource,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // =========================
  // CLEAR PRODUCTS CACHE
  // =========================

  private async clearProductsCache() {
    const keys = await (
      this.cacheManager as any
    ).store.keys('products:*');

    if (keys.length > 0) {
      await Promise.all(
        keys.map((key: string) =>
          this.cacheManager.del(key),
        ),
      );
    }
  }

  // =========================
  // CREATE ORDER
  // =========================

 async create(dto: CreateOrderDto, userId: number): Promise<Order> {
  const qr = this.dataSource.createQueryRunner();

  await qr.connect();
  await qr.startTransaction();

  let order: Order;

  try {
    let totalPrice = 0;
    const orderItems: OrderItem[] = [];

    for (const item of dto.items) {
      const product = await qr.manager.findOne(Product, {
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Product #${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${product.name}": available ${product.stock}, requested ${item.quantity}`,
        );
      }

      product.stock -= item.quantity;
      await qr.manager.save(product);

      const orderItem = qr.manager.create(OrderItem, {
        product,
        quantity: item.quantity,
        price: Number(product.price),
      });

      orderItems.push(orderItem);

      totalPrice += Number(product.price) * item.quantity;
    }

    order = qr.manager.create(Order, {
      user: { id: userId } as any,
      items: orderItems,
      totalPrice,
      status: OrderStatus.PENDING,
    });

    const saved = await qr.manager.save(order);

    await qr.commitTransaction();

    await this.clearProductsCache();

    return saved;
  } catch (error) {
    // 💥 IMPORTANT FIX
    if (qr.isTransactionActive) {
      await qr.rollbackTransaction();
    }
    throw error;
  } finally {
    await qr.release();
  }
}
  // =========================
  // GET ALL ORDERS
  // =========================

  async findAll(
    query: OrderQueryDto,
    userId: number,
    userRole: Role,
  ) {
    const {
      page = 1,
      pageSize = 10,
      status,
    } = query;

    const qb = this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect(
        'order.items',
        'item',
      )
      .leftJoinAndSelect(
        'item.product',
        'product',
      )
      .leftJoinAndSelect(
        'order.user',
        'user',
      );

    // OWNERSHIP

    if (userRole !== Role.ADMIN) {
      qb.andWhere(
        'order.userId = :userId',
        {
          userId,
        },
      );
    }

    // FILTER STATUS

    if (status) {
      qb.andWhere(
        'order.status = :status',
        {
          status,
        },
      );
    }

    // SORT

    qb.orderBy(
      'order.createdAt',
      'DESC',
    );

    // PAGINATION

    qb.skip((page - 1) * pageSize)
      .take(pageSize);

    const [items, total] =
      await qb.getManyAndCount();

    return {
      items,

      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(
          total / pageSize,
        ),
      },
    };
  }

  // =========================
  // GET ONE ORDER
  // =========================

  async findOne(
    id: number,
    userId: number,
    userRole: Role,
  ): Promise<Order> {
    const order =
      await this.orderRepo.findOne({
        where: { id },

        relations: [
          'items',
          'items.product',
          'user',
        ],
      });

    if (!order) {
      throw new NotFoundException(
        `Order #${id} not found`,
      );
    }

    // OWNERSHIP CHECK

    if (
      userRole !== Role.ADMIN &&
      order.user.id !== userId
    ) {
      throw new ForbiddenException(
        'You can only view your own orders',
      );
    }

    return order;
  }

  // =========================
  // UPDATE STATUS
  // =========================

  async updateStatus(
    id: number,
    dto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order =
      await this.orderRepo.findOne({
        where: { id },

        relations: [
          'items',
          'items.product',
        ],
      });

    if (!order) {
      throw new NotFoundException(
        `Order #${id} not found`,
      );
    }

    const transitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PENDING]: [
    OrderStatus.CONFIRMED,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.CONFIRMED]: [
    OrderStatus.SHIPPED,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.SHIPPED]: [
    OrderStatus.DELIVERED,
  ],

  [OrderStatus.DELIVERED]: [],

  [OrderStatus.CANCELLED]: [],
};

    const allowed =
      transitions[order.status];

    if (
      !allowed.includes(dto.status)
    ) {
      throw new BadRequestException(
        `Cannot change status from "${order.status}" to "${dto.status}"`,
      );
    }

    // RETURN STOCK IF CANCELLED

    if (
      dto.status ===
      OrderStatus.CANCELLED
    ) {
      for (const item of order.items) {
        item.product.stock +=
          item.quantity;

        await this.productRepo.save(
          item.product,
        );
      }

      await this.clearProductsCache();
    }

    order.status = dto.status;

    return this.orderRepo.save(order);
  }

  // =========================
  // DELETE ORDER
  // =========================

  async remove(
    id: number,
  ): Promise<void> {
    const order =
      await this.orderRepo.findOne({
        where: { id },
      });

    if (!order) {
      throw new NotFoundException(
        `Order #${id} not found`,
      );
    }

    await this.orderRepo.remove(order);
  }
}