import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
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
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^\d+$/, { message: 'Card number must contain only numbers' })
  cardNumber: string;
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
