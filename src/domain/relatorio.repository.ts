import { GetRelatorioDto } from 'src/presentations/dto/get-relatorio.dto';
import { Relatorio } from './relatorio.entity';

export interface IRelatorioRepository {
  getAllRelatorios(): Promise<Relatorio>;
  createRelatorio(relatorioDto: GetRelatorioDto): Promise<any>;
}
