import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PontoModule } from './presentations/relatorio.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './infrastructure/config/db.config';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), PontoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
