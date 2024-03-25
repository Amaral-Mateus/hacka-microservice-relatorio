import { Model, PrimaryKey } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';

export type ListAttributes = {
  id: number;
  userId: string;
  timeStamp: Date;
  startTime: Date;
  endTime: Date;
  data: object;
};

@Table({ tableName: 'relatorio' })
export class RelatorioModel extends Model<ListAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column
  userId: string;

  @Column
  timeStamp: Date;

  @Column
  startTime: Date;

  @Column
  endTime: Date;

  @Column({ type: DataType.JSON })
  data: object;
}
