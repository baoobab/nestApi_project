import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "../products/products.model";


interface MediaCreationAttrs { // поля, которые нужны для создания объекта класса
  title: string;
}

@Table({tableName: 'media'})
export class Media extends Model<Media, MediaCreationAttrs> {
  @ApiProperty({example: '1', description: 'Уникальный ID'}) // документируем поля (для примера)
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '5345d670-c2ee-4ba2-99a4-cfdadd93ac6b.webp', description: 'Название изображения и расширение'})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  // @BelongsTo(() => Product, 'id')
  // product: Product
}