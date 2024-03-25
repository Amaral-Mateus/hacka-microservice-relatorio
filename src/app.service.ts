import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): string {
    const env = String(process.env.NODE_ENV);
    return `Relatorio Microservice Server Running in ${env}`;
  }
}