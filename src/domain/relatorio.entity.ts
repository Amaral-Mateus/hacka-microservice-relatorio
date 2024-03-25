export class Relatorio {
  userId: string;
  timeStamp: Date;
  startTime: Date;
  endTime: Date;
  data: {};

  constructor(userId: string, timeStamp: Date, startTime: Date, endTime: Date, data: {}) {
    this.userId = userId;
    this.timeStamp = timeStamp;
    this.startTime = startTime;
    this.endTime = endTime
    this.data = data
  }
}
