import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @ApiProperty({example: 'Пицца Маргарита', description: 'Название товара'})
  @IsString({message: 'Название должно быть строкой'})
  readonly title: string;
  @ApiProperty({example: '640', description: 'Вес (в граммах)'})
  @IsNumber({},{message: 'Вес должен быть числом'})
  readonly base_weight: number;
  @ApiProperty({example: '25', description: 'Опционально - Диаметр (в сантиметрах)'})
  @ApiProperty({example: '650', description: 'Цена (в рублях)'})
  @IsNumber({},{message: 'Цена должна быть числом'})
  readonly base_price: number;
  @IsOptional()
  @IsNumber({},{message: 'Диаметр должен быть числом'})
  readonly base_diameter?: number;
  @ApiProperty({example: '15', description: 'Необязательно - ID фото (связь)'})
  @IsOptional()
  @IsNumber({},{message: 'Должно быть числом'})
  readonly media_id?: number;

}