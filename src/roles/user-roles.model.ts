import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Role } from "./roles.model";


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles> {

  @ApiProperty({example: '1', description: 'Уникальный ID'}) // документируем поля (для примера)
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: '2', description: 'ID пользователя (связь)'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, allowNull: false})
  user_id: number;

  @ApiProperty({example: '3', description: 'ID роли (связь)'})
  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER, allowNull: false})
  role_id: number;
}