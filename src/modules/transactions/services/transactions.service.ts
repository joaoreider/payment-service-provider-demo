import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/modules/clients/clients.service';
import { Transaction } from '../entities/transaction.entity';
import TransactionRepository from '../repositories/transaction.repository';
import { CreateTransactionDTO } from '../dto/create-transaction.dto';
import { Balance } from '../dto/balance.dto';
import { PayableService } from './payable.service';
import { EncryptService } from 'src/libs/commons/services/encryption.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly clientService: ClientsService,
    private readonly payableService: PayableService,
    private readonly encriptService: EncryptService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDTO,
  ): Promise<Transaction> {
    await this.clientService.validateClient(createTransactionDto.clientId);

    const transaction: Omit<Transaction, 'id'> = {
      ...createTransactionDto,
    };

    const payable = this.payableService.build(createTransactionDto);
    const dbTransaction = {
      ...createTransactionDto,
      cardNumber: await this.getEncriptedCardNumberLastFourDigits(
        transaction.cardNumber,
      ),
    };
    return await this.transactionRepository.create(dbTransaction, payable);
  }

  async balance(clientId: string): Promise<Balance> {
    await this.clientService.validateClient(clientId);

    const availablePromise =
      this.transactionRepository.getAvailableBalance(clientId);
    const waitingFundsPromise =
      this.transactionRepository.getPendingBalance(clientId);

    const [availableBalance, waitingFundsBalance] = await Promise.all([
      availablePromise,
      waitingFundsPromise,
    ]);

    return {
      available: availableBalance.available,
      waitingFunds: waitingFundsBalance.pending,
    };
  }

  async listClientTransactions(clientId: string): Promise<Transaction[]> {
    return (await this.transactionRepository.findAllByClient(clientId))
      .transactions;
  }

  private async getEncriptedCardNumberLastFourDigits(
    cardNumber: string,
  ): Promise<string> {
    const lastFourDigits = cardNumber.slice(-4);
    const encryptedLastFourDigits =
      await this.encriptService.encrypt(lastFourDigits);

    return encryptedLastFourDigits;
  }
}
