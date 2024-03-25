import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RelatorioModel } from '../models/relatorio.model';
import { RelatorioRepositorySequelize } from './relatorio.repository.impl.sequelize';
import { PubSubService } from '../services/pub-sub.service';

@Module({
  imports: [SequelizeModule.forFeature([RelatorioModel])],
  providers: [RelatorioRepositorySequelize, PubSubService],
  exports: [RelatorioRepositorySequelize, PubSubService],
})
export class RepositoriesModule {}
