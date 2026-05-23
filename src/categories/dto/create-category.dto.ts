import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Назва категорії',
  })
  @IsString()
  name!: string;

  @ApiPropertyOptional({
    example: 'All electronic devices',
    description: 'Опис категорії',
  })
  @IsOptional()
  @IsString()
  description?: string;
}