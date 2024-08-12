import { CreateTransactionDTO } from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

export default abstract class TransactionRepository {
  abstract create(
    id: string,
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<Transaction>;
  abstract findOne(id: string): Promise<Transaction>;
  abstract findAll(): Promise<Transaction[]>;
}
