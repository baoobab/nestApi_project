import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

interface Ban_listModelCreationAttrs { // поля, которые нужны для создания объекта класса
    banned_user_id: number;
}

@Table({tableName: 'ban_list'})
export class Ban_listModel extends Model<Ban_listModel, Ban_listModelCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный ID'}) // документируем поля (для примера)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '2', description: 'ID пользователя (связь)'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true})
    banned_user_id: number;

    @ApiProperty({example: 'Мошенничество', description: 'Причина блокировки'})
    @Column({type: DataType.STRING, allowNull: true})
    ban_reason: string;

    @BelongsTo(() => User)
    user: User;
}