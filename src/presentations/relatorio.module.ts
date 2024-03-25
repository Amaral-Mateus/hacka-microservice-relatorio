import { Module } from '@nestjs/common';
import { RelatorioController } from './relatorio.controller';
import { RelatorioModel } from 'src/infrastructure/models/relatorio.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrastructure/use-case-proxy/usecase-proxy.module';

@Module({
  imports: [
    SequelizeModule.forFeature([RelatorioModel]),
    UsecaseProxyModule.register(),
  ],
  controllers: [RelatorioController],
})
export class PontoModule {}
