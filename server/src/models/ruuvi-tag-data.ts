import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ timestamps: true })
export default class RuuviTagData extends Model {
  @Column({
    type: DataType.STRING(12),
    allowNull: false,
    primaryKey: true
  })
  tagId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  dataFormat!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  rssi!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  temperature!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false
  })
  humidity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  pressure!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  accelerationX!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  accelerationY!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  accelerationZ!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  battery!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  txPower!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  movementCounter!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  measurementSequenceNumber!: number;

  @Column({
    type: DataType.STRING(17),
    allowNull: false
  })
  mac!: string;
}
