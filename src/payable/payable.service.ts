import { Injectable, NotFoundException } from '@nestjs/common';
import PayableRepository from './repositories/payable.repository';
import { Payable } from './entities/payable.entity';
import { CreatePayableDTO } from './dto/create-payable.dto';

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async create(createPayableDTO: CreatePayableDTO): Promise<Payable> {
    // TODO: Implement
  }

  async findAll(): Promise<Payable[]> {
    return await this.payableRepository.findAll();
  }

  async findOne(id: string): Promise<Payable> {
    const payable = await this.payableRepository.findOne(id);
    if (!payable) {
      throw new NotFoundException(`Payable #${id} not found`);
    }
    return payable;
  }
}
