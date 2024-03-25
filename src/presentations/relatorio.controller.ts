import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { GetRelatorioDto } from './dto/get-relatorio.dto';
import { GetRelatorioUseCase } from 'src/application/use-cases/get-report.use-case copy';
import { UsecaseProxyModule } from 'src/infrastructure/use-case-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/use-case-proxy/usecase-proxy';

@Controller('relatorio')
export class RelatorioController {
  constructor(
    @Inject(UsecaseProxyModule.GET_RELATORIO_USE_CASE)
    private readonly getRelatorioUseCase: UseCaseProxy<GetRelatorioUseCase>,
  ) {}

  @Post()
  async register(@Body() relatorioDto: GetRelatorioDto) {
    return this.getRelatorioUseCase.getInstance().execute(relatorioDto);
  }
}
