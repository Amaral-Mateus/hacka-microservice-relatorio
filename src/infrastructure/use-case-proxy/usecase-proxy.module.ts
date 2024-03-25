import { DynamicModule, Module } from '@nestjs/common';
import { RelatorioRepositorySequelize } from '../repositories/relatorio.repository.impl.sequelize';
import { UseCaseProxy } from './usecase-proxy';
import { GetRelatorioUseCase } from 'src/application/use-cases/get-report.use-case';
import { CreteRelatorioUseCase} from 'src/application/use-cases/create-report.use-case'
import { RepositoriesModule } from '../repositories/repositories.module';
@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //Relatorio
  static GET_RELATORIO_USE_CASE = 'getRelatorioUsecaseProxy';
  static CREATE_RELATORIO_USE_CASE = 'createRelatorioUseCaseProxy'

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

        {
          inject: [RelatorioRepositorySequelize],
          provide: UsecaseProxyModule.CREATE_RELATORIO_USE_CASE,
          useFactory: (relatorioRepository: RelatorioRepositorySequelize) =>
            new UseCaseProxy(new CreteRelatorioUseCase(relatorioRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.GET_RELATORIO_USE_CASE,
        UsecaseProxyModule.CREATE_RELATORIO_USE_CASE
      ],
    };
  }
}
