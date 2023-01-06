import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";
import { ApiProperty } from "@nestjs/swagger";

interface ReferralsModelCreationAttrs { // поля, которые нужны для создания объекта класса
    parent_user_id: number;
    child_user_id: number;
}

@Table({tableName: 'referrals'})
export class ReferralsModel extends Model<ReferralsModel, ReferralsModelCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный ID'}) // документируем поля (для примера)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '6', description: 'ID пользователя - пригласитель (связь)'})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    parent_user_id: number;

    @ApiProperty({example: '1', description: 'ID пользователя - приглашённый (связь)'})
    @Column({type: DataType.INTEGER, allowNull: false})
    child_user_id: number;

    @BelongsTo(() => User)
    user: User;
}