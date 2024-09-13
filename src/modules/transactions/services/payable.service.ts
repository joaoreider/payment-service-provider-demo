import { Injectable } from '@nestjs/common';
import { Payable, PayableStatus } from '../entities/payable.entity';
import { THIRTY_DAYS } from 'src/libs/commons/constants/app.constants';
import { CreatePayableDTO } from '../dto/create-payable.dto';
import { PaymentMethod } from '../entities/transaction.entity';

@Injectable()
export class PayableService {
  constructor() {}
  build(
    createPayableDto: CreatePayableDTO,
  ): Omit<Payable, 'id' | 'transactionId'> {
    let fee: number;
    let discount: number;
    let amount: number;
    let paymentDate: Date;
    let status: PayableStatus;

    switch (createPayableDto.paymentMethod) {
      case PaymentMethod.CREDIT:
        fee = this.calculateFee(PaymentMethod.CREDIT);
        discount = this.calculateDiscount(fee, createPayableDto.value);
        amount = createPayableDto.value - discount;
        paymentDate = new Date(new Date().getTime() + THIRTY_DAYS);
        status = PayableStatus.WAITING_FUNDS;

        return {
          value: amount,
          status,
          paymentDate,
          fee,
          clientId: createPayableDto.clientId,
        };
      case PaymentMethod.DEBIT:
        fee = this.calculateFee(PaymentMethod.DEBIT);
        discount = this.calculateDiscount(fee, createPayableDto.value);
        amount = createPayableDto.value - discount;
        paymentDate = new Date(); // d+0
        status = PayableStatus.PAID;

        return {
          value: amount,
          status,
          paymentDate,
          fee,
          clientId: createPayableDto.clientId,
        };

      default:
        throw new Error('Unsupported payment method');
    }
  }

  private calculateFee(paymentMethod: PaymentMethod): number {
    switch (paymentMethod) {
      case PaymentMethod.CREDIT:
        return 5;
      case PaymentMethod.DEBIT:
        return 3;
      default:
        throw new Error('Unsupported payment method');
    }
  }

  private calculateDiscount(fee: number, value: number): number {
    return fee * (value / 100);
  }
}
