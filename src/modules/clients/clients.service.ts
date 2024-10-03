import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDTO } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import ClientRepository from './repositories/client.repository';
import { UuidGeneratorService } from '../../libs/commons/services/uuid-generator.service';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly uuidGeneratorService: UuidGeneratorService,
  ) {}

  async create(createClientDTO: CreateClientDTO): Promise<Client> {
    const client = await this.clientRepository.findByName(createClientDTO.name);
    if (client) {
      throw new ConflictException(
        'This client name is already in use. Please, choose another one.',
      );
    }
    const data: Client = {
      id: this.uuidGeneratorService.generate(),
      ...createClientDTO,
    };

    return await this.clientRepository.create(data);
  }

  async validateClient(id: string): Promise<Client> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }
}
