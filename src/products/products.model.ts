import { Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Media } from "../media/media.model";


interface ProductCreationAttrs { // поля, которые нужны для создания объекта класса
  title: string;
  base_weight: number;
  base_price: number;
}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({example: '1', description: 'Уникальный ID'}) // документируем поля (для примера)
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'Пицца Маргарита', description: 'Название товара'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: '400', description: 'Вес (в граммах)'})
  @Column({type: DataType.INTEGER, allowNull: false})
  base_weight: number;

  @ApiProperty({example: '25', description: 'Диаметр (в сантиметрах)'})
  @Column({type: DataType.INTEGER, allowNull: true})
  base_diameter: number;

  @ApiProperty({example: '650', description: 'Цена (в рублях)'})
  @Column({type: DataType.INTEGER, allowNull: false})
  base_price: number;

  @ApiProperty({example: '15', description: 'ID фотографии (связь)'})
  // @ForeignKey(() => Media)
  @Column({type: DataType.INTEGER, allowNull: true})
  media_id: number;

  // @HasOne(() => Media, 'media_id')
  // media: Media
}