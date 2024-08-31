import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/modules/clients/clients.service';
import { PaymentMethod, Transaction } from '../entities/transaction.entity';
import { Payable, PayableStatus } from '../entities/payable.entity';
import { UuidGeneratorService } from 'src/libs/commons/services/uuid-generator.service';
import TransactionRepository from '../repositories/transaction.repository';
import { CreateTransactionDTO } from '../dto/create-transaction.dto';
import { BalanceResponse } from '../dto/balance-response.dto';
import { THIRTY_DAYS } from 'src/libs/commons/constants/app.constants';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly uuidGeneratorService: UuidGeneratorService,
    private readonly clientService: ClientsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDTO,
  ): Promise<Transaction> {
    await this.clientService.validateClient(createTransactionDto.clientId);

    createTransactionDto.cardNumber = this.getCardLastFourDigits(
      createTransactionDto.cardNumber,
    );

    switch (createTransactionDto.paymentMethod) {
      case PaymentMethod.CREDIT:
        return this.createCreditTransaction(createTransactionDto);
      case PaymentMethod.DEBIT:
        return this.createDebitTransaction(createTransactionDto);
    }
  }

  async balance(clientId: string): Promise<BalanceResponse> {
    await this.clientService.validateClient(clientId);

    const availablePromise =
      this.transactionRepository.getAvailableBalance(clientId);
    const waitingFundsPromise =
      this.transactionRepository.getPendingBalance(clientId);

    const [available, waitingFunds] = await Promise.all([
      availablePromise,
      waitingFundsPromise,
    ]);

    return { available, waitingFunds };
  }

  private async createCreditTransaction(
    createTransactionDto: CreateTransactionDTO,
  ): Promise<Transaction> {
    const fee = 5; // 5% Tax
    const discount = fee * (createTransactionDto.value / 100);
    const amount = createTransactionDto.value - discount;
    const paymentDate = new Date(new Date().getTime() + THIRTY_DAYS); // d+30 TODO: Turn into a more readable code

    const transaction: Transaction = {
      id: this.uuidGeneratorService.generate(),
      ...createTransactionDto,
    };

    const payable: Payable = {
      id: this.uuidGeneratorService.generate(),
      value: amount,
      status: PayableStatus.WAITING_FUNDS,
      paymentDate,
      fee,
      clientId: transaction.clientId,
      transactionId: transaction.id,
    };

    return await this.transactionRepository.create(transaction, payable);
  }

  private async createDebitTransaction(
    createTransactionDto: CreateTransactionDTO,
  ): Promise<Transaction> {
    const fee = 3; // 3% Tax
    const discount = fee * (createTransactionDto.value / 100);
    const amount = createTransactionDto.value - discount;
    const paymentDate = new Date(); // d+0

    const transaction: Transaction = {
      id: this.uuidGeneratorService.generate(),
      ...createTransactionDto,
    };

    const payable: Payable = {
      id: this.uuidGeneratorService.generate(),
      value: amount,
      status: PayableStatus.PAID,
      paymentDate,
      fee,
      clientId: transaction.clientId,
      transactionId: transaction.id,
    };

    return await this.transactionRepository.create(transaction, payable);
  }

  private getCardLastFourDigits(cardNumber: number): number {
    const numberString = cardNumber.toString();
    return Number(numberString.slice(-4));
  }
}
