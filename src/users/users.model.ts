import {Column, DataType, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAttrs { // поля, которые нужны для создания объекта класса
    email: string;
    password: string;
    referral_link: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный ID'}) // документируем поля (для примера)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'test@gmail.com', description: 'Эл. почта'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: '1234ASDasd_', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example: '5345d670-c2ee-4ba2-99a4-cfdadd93ac6b', description: 'Уникальная реф. ссылка'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    referral_link: string;
}