import { DynamicModule, Module } from '@nestjs/common';
import { RelatorioRepositorySequelize } from '../repositories/relatorio.repository.impl.sequelize';
import { UseCaseProxy } from './usecase-proxy';
import { GetRelatorioUseCase } from 'src/application/use-cases/get-report.use-case copy';
import { RepositoriesModule } from '../repositories/repositories.module';
@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //Relatorio
  static GET_RELATORIO_USE_CASE = 'getRelatorioUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [RelatorioRepositorySequelize],
          provide: UsecaseProxyModule.GET_RELATORIO_USE_CASE,
          useFactory: (relatorioRepository: RelatorioRepositorySequelize) =>
            new UseCaseProxy(new GetRelatorioUseCase(relatorioRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_RELATORIO_USE_CASE
      ],
    };
  }
}
