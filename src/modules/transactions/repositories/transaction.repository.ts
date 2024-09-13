import { Payable } from '../entities/payable.entity';
import { Transaction } from '../entities/transaction.entity';

export interface RequestCreateTransaction extends Omit<Transaction, 'id'> {}
export interface CreatedTransaction extends Transaction {}

export interface RequestCreatePayable
  extends Omit<Payable, 'id' | 'transactionId'> {}
export interface CreatedPayable extends Payable {}

export interface TransactionList {
  transactions: Transaction[];
}

export interface AvailableBalanceResponse {
  available: number;
}

export interface PendingBalanceResponse {
  pending: number;
}

export default abstract class TransactionRepository {
  abstract create(
    requestCreateTransaction: RequestCreateTransaction,
    requestCreatePayable: RequestCreatePayable,
  ): Promise<CreatedTransaction>;
  abstract findAllByClient(clientId: string): Promise<TransactionList>;
  abstract getAvailableBalance(
    clientId: string,
  ): Promise<AvailableBalanceResponse>;
  abstract getPendingBalance(clientId: string): Promise<PendingBalanceResponse>;
}
