import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({ status: 201, description: 'Користувач створений' })
  @ApiResponse({ status: 400, description: 'Помилка валідації' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Логін користувача' })
  @ApiResponse({ status: 200, description: 'Успішний логін' })
  @ApiResponse({ status: 401, description: 'Невірні дані' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}