import sequelize, { Op } from 'sequelize';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

type RuuviTagHourlyData = Pick<RuuviTagHistoricalData, 'tagId'> & {
  temperatureAvg: number
  startDate: Date
};

@Table({ timestamps: true })
export default class RuuviTagHistoricalData extends Model {
  @Column({
    type: DataType.STRING(12),
    allowNull: false
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

  static async findHourly (periodStart?: Date, periodEnd?: Date): Promise<RuuviTagHourlyData[]> {
    let queryPeriodStart, queryPeriodEnd;

    if (periodStart !== undefined) {
      queryPeriodStart = periodStart;
    } else {
      // 24 hours ago
      queryPeriodStart = new Date();
      queryPeriodStart.setDate(queryPeriodStart.getDate() - 1);
      queryPeriodStart.setHours(queryPeriodStart.getHours(), 0, 0, 0);
    }

    if (periodEnd !== undefined) {
      queryPeriodEnd = periodEnd;
    } else {
      // Before start of current hour (no imcomplete periods)
      queryPeriodEnd = new Date();
      queryPeriodEnd.setHours(queryPeriodEnd.getHours(), 0, 0, 0);
    }

    return await this.findAll({
      attributes: [
        'tagId',
        [sequelize.fn('AVG', sequelize.col('temperature')), 'temperatureAvg'],
        [sequelize.fn('DATE_TRUNC', 'hour', sequelize.col('createdAt')), 'startDate']
      ],
      where: {
        createdAt: {
          [Op.between]: [queryPeriodStart, queryPeriodEnd]
        }
      },
      group: ['tagId', 'startDate'],
      order: ['tagId', 'startDate']
    }) as unknown as RuuviTagHourlyData[];
  }
}
