import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDTO } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { v4 as uuidv4 } from 'uuid';
import ClientRepository from './repositories/client.repository';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async create(createClientDTO: CreateClientDTO): Promise<Client> {
    const user = await this.clientRepository.findByName(createClientDTO.name);
    if (user) {
      throw new ConflictException('Client already exists');
    }
    const data: Client = {
      id: uuidv4(),
      ...createClientDTO,
    };

    return await this.clientRepository.create({ ...data });
  }

  async findAll() {
    return this.clientRepository.findAll();
  }

  async findByName(name: string): Promise<Client> {
    return this.clientRepository.findByName(name);
  }

  async findById(id: string): Promise<Client> {
    return this.clientRepository.findById(id);
  }
}
