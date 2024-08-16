import { Injectable, NotFoundException } from '@nestjs/common';
import PayableRepository from './repositories/payable.repository';
import { Payable, PayableStatus } from './entities/payable.entity';
import { CreatePayableDTO } from './dto/create-payable.dto';
import { PaymentMethod } from '../transactions/entities/transaction.entity';
import { v4 as uuidv4 } from 'uuid';
import { THIRTY_DAYS } from '../constants';
import { PayableBalanceResponse } from './dto/payable-balance-response.dto';

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async create(createPayableDTO: CreatePayableDTO): Promise<Payable> {
    switch (createPayableDTO.paymentMethod) {
      case PaymentMethod.CREDIT:
        return this.createPayableCredit(createPayableDTO);
      case PaymentMethod.DEBIT:
        return this.createPayableDebit(createPayableDTO);
    }
  }

  async createPayableCredit(
    createPayableDTO: CreatePayableDTO,
  ): Promise<Payable> {
    const fee = 5; // 5% Tax
    const discount = fee * (createPayableDTO.value / 100);
    const amount = createPayableDTO.value - discount;
    const paymentDate = new Date(new Date().getTime() + THIRTY_DAYS); // d+30
    const payable: Payable = {
      id: uuidv4(),
      ...createPayableDTO,
      fee,
      value: amount,
      paymentDate,
      status: PayableStatus.WAITING_FUNDS,
    };
    return this.payableRepository.create(payable);
  }

  async createPayableDebit(
    createPayableDTO: CreatePayableDTO,
  ): Promise<Payable> {
    const fee = 3; // 3% Tax
    const discount = fee * (createPayableDTO.value / 100);
    const amount = createPayableDTO.value - discount;
    const paymentDate = new Date(); // d+0
    const payable: Payable = {
      id: uuidv4(),
      ...createPayableDTO,
      fee,
      value: amount,
      paymentDate,
      status: PayableStatus.PAID,
    };
    return this.payableRepository.create(payable);
  }

  async balance(clientId: string): Promise<PayableBalanceResponse> {
    const availablePromise =
      this.payableRepository.getAvailableBalance(clientId);
    const waitingFundsPromise =
      this.payableRepository.getPendingBalance(clientId);

    const [available, waitingFunds] = await Promise.all([
      availablePromise,
      waitingFundsPromise,
    ]);

    return { available, waitingFunds };
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
