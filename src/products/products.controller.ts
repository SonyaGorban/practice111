import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// якщо у тебе є guards — підключи нормально
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor() {}

  // 🟢 GET ALL (public)
  @Get()
  @ApiOperation({
    summary: 'Отримати всі продукти',
    description: 'Повертає список усіх продуктів з категоріями',
  })
  @ApiResponse({ status: 200, description: 'Список продуктів' })
  findAll() {
    return [];
  }

  // 🟢 GET BY ID (public)
  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiResponse({ status: 200, description: 'Продукт знайдено' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return {};
  }

  // 🔐 CREATE (admin)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити продукт (admin)' })
  @ApiBody({ type: CreateProductDto }) // 🔥 ВАЖЛИВО — через це з'являється body
  @ApiResponse({ status: 201, description: 'Продукт створено' })
  @ApiResponse({ status: 400, description: 'Помилка валідації' })
  @ApiResponse({ status: 401, description: 'Не авторизовано' })
  @ApiResponse({ status: 403, description: 'Недостатньо прав' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateProductDto) {
    return {};
  }

  // 🔐 UPDATE (admin)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Оновити продукт (admin)' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Продукт оновлено' })
  @ApiResponse({ status: 404, description: 'Не знайдено' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return {};
  }

  // 🔐 DELETE (admin)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Видалити продукт (admin)' })
  @ApiResponse({ status: 200, description: 'Продукт видалено' })
  @ApiResponse({ status: 404, description: 'Не знайдено' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return {};
  }
}