import { CreateClientDTO } from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';

export default abstract class ClientRepository {
  abstract findByName(name: string): Promise<Client>;
  abstract findById(id: string): Promise<Client>;
  abstract create(data: CreateClientDTO): Promise<Client>;
  abstract findAll(): Promise<Client[]>;
}
