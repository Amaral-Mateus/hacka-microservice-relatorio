import { RelatorioModel } from '../models/relatorio.model';
import { IRelatorioRepository } from 'src/domain/relatorio.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetRelatorioDto } from 'src/presentations/dto/get-relatorio.dto';
import { PubSubService } from '../services/pub-sub.service';

@Injectable()
export class RelatorioRepositorySequelize implements IRelatorioRepository {
  constructor(
    @InjectModel(RelatorioModel)
    private relatorioModel: typeof RelatorioModel,
    private readonly pubSubService: PubSubService,
  ) {
    this.subscribeToRelatorioEvents
  }

  async getRelatorio(relatorio: GetRelatorioDto): Promise<any> {
    const newRelatorio = await this.relatorioModel.create(relatorio);

    await this.pubSubService.publishMessage('projects/hackathon-fiap-ponto/topics/new_relatorio', newRelatorio)

    return "test";
  }

  private decodeBase64(base64String: string): string {
    // Decodificar a string base64 de volta ao valor original
    return Buffer.from(base64String, 'base64').toString();
  }

  private async subscribeToRelatorioEvents() {
    try {
      await this.pubSubService.subscribe(
        'projects/hackathon-fiap-ponto/topics/relatorio_ready-sub',
        async (message) => {
          //Manage message base64 decoding
          const messageData = message.data;
          const string64 = this.decodeBase64(messageData);
          const originalString = this.decodeBase64(string64);
          const originalJson = JSON.parse(originalString);

          const relatorio =  await this.relatorioModel.findByPk(originalJson.id)

          relatorio.update(originalJson);
        },
      );
      console.log('Subscribed to order_queue-sub successfully.');
    } catch (error) {
      console.error('Error subscribing to order_queue-sub:', error);
    }
  }
}
