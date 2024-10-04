import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../entities/transaction.entity';

export class TransactionResponse {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Transaction ID',
  })
  id: string;
  @ApiProperty({
    example: 100,
    description: 'Transaction value',
  })
  value: number;
  @ApiProperty({
    example: 'Online Bookstore Purchase',
    description: 'Transaction description',
  })
  description: string;
  @ApiProperty({
    enum: PaymentMethod,
    description: 'Payment method',
  })
  paymentMethod: string;
  @ApiProperty({
    example: '1234567812345678',
    description: 'Card number',
  })
  cardNumber: string;
  @ApiProperty({
    example: 'John Doe',
    description: 'Card holder name',
  })
  cardHolder: string;
  @ApiProperty({
    example: '12/25',
    description: 'Card expiry date',
  })
  cardExpiry: string;
  @ApiProperty({
    example: 123,
    description: 'Card CVV',
  })
  cvv: number;
  @ApiProperty({
    example: '048ab22e-6a84-40c2-bd41-f355c4748754',
    description: 'Client ID',
  })
  clientId: string;

  constructor(partial: Partial<TransactionResponse>) {
    Object.assign(this, partial);
  }
}
