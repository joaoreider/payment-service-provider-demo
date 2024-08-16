import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import ClientRepository from './client.repository';
import { Client } from '../entities/client.entity';

@Injectable()
export default class PrismaClientRepository extends ClientRepository {
  constructor(public readonly prisma: PrismaService) {
    super();
  }

  async findByName(name: string): Promise<Client> {
    return this.prisma.client.findUnique({ where: { name } });
  }

  async findById(id: string): Promise<Client> {
    return this.prisma.client.findUnique({ where: { id } });
  }

  async create(client: Client): Promise<Client> {
    return this.prisma.client.create({
      data: {
        ...client,
      },
    });
  }

  async findAll(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }
}
