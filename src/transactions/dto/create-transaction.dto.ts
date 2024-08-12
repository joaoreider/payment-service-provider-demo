import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentMethod } from '../entities/transaction.entity';

export class CreateTransactionDTO {
  @IsNotEmpty()
  @IsNumber()
  value: number;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsEnum(PaymentMethod)
  paymentMethod: string;
  @IsNotEmpty()
  @IsNumber()
  cardNumber: number;
  @IsNotEmpty()
  @IsString()
  cardHolder: string;
  @IsNotEmpty()
  @IsString()
  cardExpiry: string;
  @IsNotEmpty()
  @IsNumber()
  cvv: number;
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
