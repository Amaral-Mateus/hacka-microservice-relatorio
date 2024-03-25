import { GetRelatorioDto } from 'src/presentations/dto/get-relatorio.dto';
import { Relatorio } from './relatorio.entity';

export interface IRelatorioService {
  getRelatorio(relatorioDto: GetRelatorioDto): Promise<Relatorio>;
}
