import { Payable } from '../entities/payable.entity';

export default abstract class PayableRepository {
  abstract create(payable: Payable): Promise<Payable>;
  abstract findOne(id: string): Promise<Payable>;
  abstract findAll(): Promise<Payable[]>;
  abstract getAvailableBalance(clientId: string): Promise<number>;
  abstract getPendingBalance(clientId: string): Promise<number>;
}
