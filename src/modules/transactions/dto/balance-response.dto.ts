import { ApiProperty } from '@nestjs/swagger';

export class BalanceResponse {
  @ApiProperty({
    example: 100,
    description: 'The available balance',
  })
  available: number;
  @ApiProperty({
    example: 100,
    description: 'The balance waiting for funds to be available',
  })
  waitingFunds: number;

  constructor(partial: Partial<BalanceResponse>) {
    Object.assign(this, partial);
  }
}
