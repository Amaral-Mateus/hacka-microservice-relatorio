import { Relatorio } from 'src/domain/relatorio.entity';
import { IRelatorioRepository } from 'src/domain/relatorio.repository';
import { GetRelatorioDto } from 'src/presentations/dto/get-relatorio.dto';

export class CreteRelatorioUseCase {
  constructor(private readonly relatorioRepository: IRelatorioRepository) {}

  async execute(relatorio: GetRelatorioDto): Promise<Relatorio> {
    return await this.relatorioRepository.createRelatorio(relatorio);
  }
}
