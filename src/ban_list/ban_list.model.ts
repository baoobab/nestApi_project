import {Column, DataType, Model, Table} from "sequelize-typescript";

interface Ban_listModelCreationAttrs { // поля, которые нужны для создания объекта класса
    banned_user_id: number;
}

@Table({tableName: 'ban_list'})
export class Ban_listModel extends Model<Ban_listModel, Ban_listModelCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER, unique: true})
    banned_user_id: number;
    @Column({type: DataType.STRING, allowNull: true})
    ban_reason: string;
}