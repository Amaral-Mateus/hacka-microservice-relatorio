import { Relatorio } from 'src/domain/relatorio.entity';
import { IRelatorioRepository } from 'src/domain/relatorio.repository';

export class GetRelatorioUseCase {
  constructor(private readonly relatorioRepository: IRelatorioRepository) {}

  async execute(): Promise<Relatorio> {
    return await this.relatorioRepository.getAllRelatorios();
  }
}
