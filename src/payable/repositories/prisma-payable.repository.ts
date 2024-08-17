import { Injectable } from '@nestjs/common';

import { Payable, PayableStatus } from '../entities/payable.entity';
import PayableRepository from './payable.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaPayableRepository extends PayableRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(payable: Payable): Promise<Payable> {
    return await this.prisma.payable.create({
      data: {
        ...payable,
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

  async getAvailableBalance(clientId: string): Promise<number> {
    const dbResult = await this.prisma.payable.aggregate({
      _sum: {
        value: true,
      },
      where: {
        clientId,
        status: PayableStatus.PAID,
      },
    });
    const availableBalance = dbResult._sum.value ?? 0;
    return availableBalance;
  }

  async getPendingBalance(clientId: string): Promise<number> {
    const dbResult = await this.prisma.payable.aggregate({
      _sum: {
        value: true,
      },
      where: {
        clientId,
        status: PayableStatus.WAITING_FUNDS,
      },
    });
    const availableBalance = dbResult._sum.value ?? 0;
    return availableBalance;
  }
}
