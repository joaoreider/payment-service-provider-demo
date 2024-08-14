import { Injectable } from '@nestjs/common';

import { Payable } from '../entities/payable.entity';
import PayableRepository from './payable.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePayableDTO } from '../dto/create-payable.dto';

@Injectable()
export class PrismaPayableRepository extends PayableRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    id: string,
    createPayableDTO: CreatePayableDTO,
  ): Promise<Payable> {
    const { transactionId, clientId, value, paymentDate, status, fee } =
      createPayableDTO;
    return await this.prisma.payable.create({
      data: {
        id,
        transactionId,
        clientId,
        value,
        paymentDate,
        status,
        fee,
      },
    });
  }

  async findOne(id: string): Promise<Payable> {
    return this.prisma.payable.findUnique({
      where: { id },
      include: { transaction: true, client: true },
    });
  }

  async findAll(): Promise<Payable[]> {
    return this.prisma.payable.findMany();
  }
}
