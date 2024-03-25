import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { GetRelatorioDto } from './dto/get-relatorio.dto';
import { GetRelatorioUseCase } from 'src/application/use-cases/get-report.use-case';
import { UsecaseProxyModule } from 'src/infrastructure/use-case-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/use-case-proxy/usecase-proxy';
import { CreteRelatorioUseCase } from 'src/application/use-cases/create-report.use-case';

@Controller('relatorio')
export class RelatorioController {
  constructor(
    @Inject(UsecaseProxyModule.GET_RELATORIO_USE_CASE)
    private readonly getRelatorioUseCase: UseCaseProxy<GetRelatorioUseCase>,
    @Inject(UsecaseProxyModule.CREATE_RELATORIO_USE_CASE)
    private readonly createRelatorioUseCase: UseCaseProxy<CreteRelatorioUseCase>,
  ) {}

  @Post()
  async register(@Body() relatorioDto: GetRelatorioDto) {
    return this.createRelatorioUseCase.getInstance().execute(relatorioDto);
  }

  @Get()
  async getAll() {
    return this.getRelatorioUseCase.getInstance().execute();
  }
}
