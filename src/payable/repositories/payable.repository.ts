import { CreatePayableDTO } from '../dto/create-payable.dto';
import { Payable } from '../entities/payable.entity';

export default abstract class PayableRepository {
  abstract create(
    id: string,
    createPayableDTO: CreatePayableDTO,
  ): Promise<Payable>;
  abstract findOne(id: string): Promise<Payable>;
  abstract findAll(): Promise<Payable[]>;
}
