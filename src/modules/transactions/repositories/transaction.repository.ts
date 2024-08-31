import { Payable } from '../entities/payable.entity';
import { Transaction } from '../entities/transaction.entity';

export default abstract class TransactionRepository {
  abstract create(
    transaction: Transaction,
    payable: Payable,
  ): Promise<Transaction>;
  abstract getAvailableBalance(clientId: string): Promise<number>;
  abstract getPendingBalance(clientId: string): Promise<number>;
}
