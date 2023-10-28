import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: false })
export default class ElectricityPrice extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
    primaryKey: true
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true
  })
  endDate!: Date;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  price!: number;
}
