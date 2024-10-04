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
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDTO {
  @ApiProperty({
    description: 'The value of the transaction',
    example: 100.5,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'A brief description of the transaction',
    example: 'Payment for order #12345',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The payment method used for the transaction',
    example: 'CREDIT',
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: string;

  @ApiProperty({
    description: 'The card number used for the transaction',
    example: '1234567812345678',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^\d+$/, { message: 'Card number must contain only numbers' })
  cardNumber: string;

  @ApiProperty({
    description: 'The name of the cardholder',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  cardHolder: string;

  @ApiProperty({
    description: 'The expiry date of the card in MM/YY format',
    example: '12/25',
  })
  @IsNotEmpty()
  @IsString()
  cardExpiry: string;

  @ApiProperty({
    description: 'The CVV number of the card',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  cvv: number;
  @ApiProperty({
    example: '048ab22e-6a84-40c2-bd41-f355c4748754',
    description: 'Client ID',
  })
  @IsNotEmpty()
  @IsString()
  clientId: string;
}
