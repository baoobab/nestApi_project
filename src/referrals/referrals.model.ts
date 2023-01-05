import {Column, DataType, Model, Table} from "sequelize-typescript";

interface ReferralsModelCreationAttrs { // поля, которые нужны для создания объекта класса
    parent_user_id: number;
    child_user_id: number;
}

@Table({tableName: 'referrals'})
export class ReferralsModel extends Model<ReferralsModel, ReferralsModelCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @Column({type: DataType.INTEGER, allowNull: false})
    parent_user_id: number;
    @Column({type: DataType.INTEGER, allowNull: false})
    child_user_id: number;
}