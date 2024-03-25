import { GetRelatorioDto } from 'src/presentations/dto/get-relatorio.dto';
import { Relatorio } from './relatorio.entity';

export interface IRelatorioRepository {
  getRelatorio(relatorioDto: GetRelatorioDto): Promise<Relatorio>;
}
